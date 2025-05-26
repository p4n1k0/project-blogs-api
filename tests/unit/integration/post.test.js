const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require('../../../src/server');
const { users, addUser } = require('./mock/user.mock');
const { postCategory } = require('./mock/post.mock');
const { expect } = chai;


chai.use(chaiHttp);


describe('Endpoint /post', () => {
    afterEach(() => {
        sinon.restore();
    });
        
});
