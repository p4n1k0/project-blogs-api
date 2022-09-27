require('dotenv').config();
const app = require('./app');
const controllers = require('./controllers');
const token = require('./middlewares/token');

// não remova a variável `API_PORT` ou o `listen`
const port = process.env.API_PORT || 3000;

// não remova esse endpoint
app.get('/', (_request, response) => {
  response.send();
});

app.post('/login', controllers.login);
app.post('/user', controllers.newUser);
app.get('/user', token, controllers.getUsers);

app.listen(port, () => console.log('ouvindo porta', port));
