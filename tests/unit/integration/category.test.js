const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/server');
const { users } = require('./mock/user.mock');
const { expect } = chai;


chai.use(chaiHttp);


describe('Endpoint /categories', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('cadastra categoria', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).post('/categories').send({ name: 'Typescript' }).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(201);
        expect(data.body).to.be.deep.eq({ id: data.body.id, name: 'Typescript' });
    });

    it('ao cadastrar categoria sem nome, retorne um erro', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).post('/categories').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"name" is required' });
    });

    it('busca categorias com sucesso', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).get('/categories').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(200);       
    });
});
