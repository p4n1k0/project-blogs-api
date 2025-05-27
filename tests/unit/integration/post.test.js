const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/server');
const { users } = require('./mock/user.mock');
const { notTitle, notCategoryId, addPost, postById } = require('./mock/post.mock');
const { expect } = chai;


chai.use(chaiHttp);


describe('Endpoint /post', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('ao cadastrar um post sem titulo, retorne um erro', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).post('/post').send(notTitle).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: 'Some required fields are missing' });
    });

    it('ao cadastrar um post sem o campo categoryIds, retorne um erro', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).post('/post').send(notCategoryId).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: '"categoryIds" not found' });
    });

    it('cadastra um post com sucesso', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).post('/post').send(addPost).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(201);
        expect(data.body).to.be.deep.eq({ id: data.body.id, title: addPost.title, content: addPost.content, userId: data.body.userId, updated: data.body.updated, published: data.body.published });
    });

    it('buscando posts com sucesso', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).get('/post').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(200);
    });

    it('buscando post pelo id com sucesso', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).get('/post/1').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.be.deep.eq(postById);
    });

    it('ao buscar post pelo id inexistente, retorne um erro', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[0].email, password: users[0].password });
        const data = await chai.request(app).get('/post/:id').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(404);
        expect(data.body).to.be.deep.eq({ message: 'Post does not exist' });
    });

    it('ao tentar atualizar psot sem autorização, retorne um erro', async () => {
        const token = await chai.request(app).post('/login').send({ email: users[1].email, password: users[1].password });
        const data = await chai.request(app).put('/post/1').send({ title: addPost.title, content: addPost.content }).set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(401);
        expect(data.body).to.be.deep.eq({ message: 'Unauthorized user' });
    });
});
