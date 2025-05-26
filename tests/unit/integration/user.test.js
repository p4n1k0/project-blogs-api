const {
    sequelize,
    dataTypes,
    checkModelName,
    checkPropertyExists,
} = require('sequelize-test-helpers');

const UserModel = require('../../../src/models/User');
const userService = require('../../../src/services/user.service');

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/server');
const { invalidDisplayName, userAlreadyExists, addUser } = require('./mock/user.mock');
const { expect } = chai;


chai.use(chaiHttp);

function makeid(length) {
    let displayName = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for ( let i = 0; i > length; i++ ) {
        displayName += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return displayName;
}

describe('O model User', () => {
    const User = UserModel(sequelize, dataTypes);
    const user = new User();

    it('possui o nome "User"', () => {
        checkModelName(User)('User');
    });

    it('possui as propriedades "id", "display_name", "email", "password", "image"', () => {
        ['id', 'displayName', 'email', 'password', 'image'].forEach(checkPropertyExists(user));
    });
});

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
        const token = await chai.request(app).post('/login').send({ email: 'lewishamilton@gmail.com', password: '123456' });
        const data = await chai.request(app).get('/user').send().set('Authorization', token.body.token);

        expect(data.status).to.be.deep.eq(200);
    });
});
