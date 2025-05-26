const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/server');
const { expect } = chai;

const loginService = require('../../../src/services/login.service');

chai.use(chaiHttp);


describe('Endpoint /login', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('ao fazer login sem todos os campos preenchidos, retorne um erro', async () => {
        const data = await chai.request(app).post('/login').send({ email: '', password: '' });

        expect(data.status).to.be.deep.eq(400);
        expect(data.body).to.be.deep.eq({ message: 'Some required fields are missing' });
    });

    it('ao fazer login com dados inválidos, retorne um erro', async () => {
        const data = await loginService({ email: 'senna@gmail.com', password: '123456' });

        expect(data.type).to.be.deep.eq('Invalid fields');
    });

    it('ao fazer login com dados válidos retorna token', async () => {
        const data = await chai.request(app).post('/login').send({ email: 'lewishamilton@gmail.com', password: '123456' });

        expect(data.status).to.be.deep.eq(200);
        expect(data.body).to.be.deep.eq({ token: data.body.token });
    });

});
