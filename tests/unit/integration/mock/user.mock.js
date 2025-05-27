const users = [{
    id: 1,
    displayName: 'Lewis Hamilton',
    email: 'lewishamilton@gmail.com',
    password: '123456',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
},
{
    id: 2,
    displayName: 'Michael Schumacher',
    email: 'MichaelSchumacher@gmail.com',
    password: '123456',
    image: 'https://sportbuzz.uol.com.br/media/_versions/gettyimages-52491565_widelg.jpg',
},
];

function gerarCaracteresAleatorios(comprimento) {
    let caracteres = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let resultado = '';
    for (let i = 0; i < comprimento; i++) {
        resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return resultado;
}

let stringAleatoria = gerarCaracteresAleatorios(8);

const validEmail = 'lewishamilton@gmail.com';
const validPassword = '123456'

const invalidDisplayName = {
    displayName: 'Lewis',
    email: validEmail,
    password: stringAleatoria,
};

const userAlreadyExists = {
    displayName: 'Lewis Hamilton',
    email: validEmail,
    password: validPassword,
};

const addUser = {
    displayName: stringAleatoria,
    email: stringAleatoria + '@email.com',
    password: stringAleatoria,
};

const deleteUser = {
    displayName: 'Senna Araujo',
    email: 'sennaara@email.com',
    password: '123456',
};

module.exports = {
    invalidDisplayName,
    userAlreadyExists,
    addUser,
    users,
    deleteUser
};
