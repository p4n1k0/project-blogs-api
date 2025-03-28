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
app.get('/user/:id', token, controllers.getUserById);
app.delete('/user/me', token, controllers.deleteUser);
app.post('/categories', token, controllers.newCategory);
app.get('/categories', token, controllers.getCategories);
app.post('/post', token, controllers.newPost);
app.get('/post', token, controllers.getPosts);
app.get('/post/search', token, controllers.findPost);
app.get('/post/:id', token, controllers.getPostById);
app.put('/post/:id', token, controllers.editPost);
app.delete('/post/:id', token, controllers.deletePost);



app.listen(port, () => {
  console.log('ouvindo porta', port)});
