const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/server');
const { invalidDisplayName, userAlreadyExists, addUser, users, deleteUser } = require('./mock/user.mock');
const { expect } = chai;


chai.use(chaiHttp);

describe('Endpoint /user', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('ao cadastrar displayName < 8 caracteres, retorne um erro', async () => {
        const data = await chai.request(app).post('/user').send(invalidDisplayName);

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"displayName" length must be at least 8 characters long' });
    });

    it('ao cadastrar usuário já existente, retorne um erro', async () => {
        const data = await chai.request(app).post('/user').send(userAlreadyExists);

        expect(data.status).to.be.deep.eq(409);
        expect(data.body).to.be.deep.eq({ message: 'User already registered' });
    });

    it('cadastra usuário com sucesso', async () => {
        const data = await chai.request(app).post('/user').send(addUser);

        expect(data.status).to.be.deep.eq(201);
        expect(data.body).to.be.deep.eq({ token: data.body.token });
    });

    it('busca usuários com sucesso', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).get('/user').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(200);
    });

    it('busca usuário pelo id com sucesso', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[1].email, password: users[1].password });
        const data = await chai.request(app).get('/user/1').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.be.deep.eq({ displayName: users[0].displayName, email: users[0].email, id: users[0].id, image: users[0].image });
    });

    it('ao buscar usuário inexistente, retorne um erro', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[1].email, password: users[1].password });
        const data = await chai.request(app).get('/user/:id').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(404);
        expect(data.body).to.be.deep.eq({ message: 'User does not exist' });
    });

    it('deleta usuario com sucesso', async () => {
        await chai.request(app).post('/user').send(deleteUser);
        const token = await chai.request(app).post('/login').send({ email: deleteUser.email, password: deleteUser.password });
        const data = await chai.request(app).delete('/user/me').send({ id: token.body.id }).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(204);
    });
});
