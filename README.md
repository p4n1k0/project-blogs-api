# Boas-vindas ao repositório do projeto API de Blogs!

Aqui você vai encontrar os detalhes de como foi estruturar o desenvolvimento do projeto a partir deste repositório.

<br />
# Entregáveis

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary>

  Desenvolvimento de uma API e um banco de dados para a produção de conteúdo para um blog! 

  Aplicação em `Node.js` usando o pacote `sequelize` para fazer um `CRUD` de posts.

  1. Construção de endpoints que estarão conectados ao seu banco de dados seguindo os princípios do REST;

  2. Para fazer um post é necessário usuário e login, portanto foi trabalhada a **relação entre** `user` e `post`; 

  3. Será necessária a utilização de categorias para os posts, trabalhando, assim, a **relação de** `posts` para `categories` e de `categories` para `posts`.

<br />
</details>

<br />

# Orientações

<details>
  <summary><strong>🐋 Rodando no Docker vs Localmente</strong></summary>
  
  ## 👉 Com Docker
 
  **:warning: Antes de começar, seu docker-compose precisa estar na versão 1.29 ou superior. [Veja aqui](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-compose-on-ubuntu-20-04-pt) ou [na documentação](https://docs.docker.com/compose/install/) como instalá-lo. No primeiro artigo, você pode substituir onde está com `1.26.0` por `1.29.2`.**


  > :information_source: Rode os serviços `node` e `db` com o comando `docker-compose up -d --build`.

  - Lembre-se de parar o `mysql` se estiver usando localmente na porta padrão (`3306`), ou adapte, caso queria fazer uso da aplicação em containers;

  - Esses serviços irão inicializar um container chamado `blogs_api` e outro chamado `blogs_api_db`;

  - A partir daqui você pode rodar o container `blogs_api` via CLI ou abri-lo no VS Code;

  > :information_source: Use o comando `docker exec -it blogs_api bash`.

  - Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`. (Instale dentro do container)
  
  - **:warning: Atenção:** Caso opte por utilizar o Docker, **TODOS** os comandos disponíveis no `package.json` (npm start, npm test, npm run dev, ...) devem ser executados **DENTRO** do container, ou seja, no terminal que aparece após a execução do comando `docker exec` citado acima. 

  - **:warning: Atenção:** O **git** dentro do container não vem configurado com suas credenciais. Ou faça os commits fora do container, ou configure as suas credenciais do git dentro do container.

  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - ✨ **Dica:** A extensão `Remote - Containers` (que estará na seção de extensões recomendadas do VS Code) é indicada para que você possa desenvolver sua aplicação no container Docker direto no VS Code, como você faz com seus arquivos locais.

  ![sequelize test](./public/remote-container.png)

  <br />
  
  ## 👉 Sem Docker

  > :information_source: Instale as dependências [**Caso existam**] com `npm install`
  
  - **:warning: Atenção:** Não rode o comando npm audit fix! Ele atualiza várias dependências do projeto, e essa atualização gera conflitos com o avaliador.

  - **✨ Dica:** Para rodar o projeto desta forma, obrigatoriamente você deve ter o `node` instalado em seu computador.
  - **✨ Dica:** O avaliador espera que a versão do `node` utilizada seja a 16.

  <br/>
</details>


<details>
  <summary><strong>‼️ Antes de começar a desenvolver</strong></summary>

1. Clone o repositório
  * `git clone git@github.com:p4n1k0r/project-blogs-api.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd project-blogs-api`

2. Instale as dependências [**Caso existam**]
  * `npm install`

<br />
</details>

<details>
  <summary><strong>🛠 Execução de testes localmente</strong></summary>

  > :information_source: IMPORTANTE

  - O teste local deve rodar o script `npm run start:test`, que vai iniciar e depois encerrar, em segundo plano **outra instância da sua API, na porta `3030`**. Dessa forma, o teste conseguira consumir sua API e validar os requisitos.

  - Sua API deve estar funcionando minimamente para que o teste comece, dado que ele aguarda o estabelecimento da mesma para começar o teste.

  - Todos os testes **vão gerar e consumir um banco de dados próprio com final `*-test`**, que é gerado através da configuração do arquivo `src/database/config/config.js`.

  - Isso vai garantir que durante seu desenvolvimento, o teste não manipule ou derrube sua API na porta padrão (`3000`) ou seu banco de dados padrão (final `*-dev`), isolando os mesmos.

  - Caso ocorra algum problema, encerre o teste com `[CTRL] + [C]` e utilize o script `npm run kill:test`

  ---

  O teste local já é configurado, internamente, com a variável de ambiente `NODE_ENV=test` para indicar o banco a ser utilizado pelo Sequelize, o que deve resultar na criação de um banco, somente para o teste:

  ![sequelize test](./public/sequelize-02.png)

  Sem essa variável (modo padrão de desenvolvimento), sua API deve resultar algo como:

  ![sequelize development](./public/sequelize-01.png)

  ---

  > :information_source: Scripts para executar os testes locais:

  Vamos usar o Jest para executar os testes, use o comando a seguir para executar todos os testes: 

  ```sh
  npm test
  ```

  Caso queira executar só um arquivo de test use o seguinte comando, considerado que quer testar o arquivo `tests/req07-createPost.test.js`:

  ```sh
  npm test tests/req07-createPost.test.js
  ```
  ou
  ```
  npm test req07
  ```

  Caso queira omitir dados de debug nos testes, utilize a variável de ambiente `DEBUG=false`, como em `DEBUG=false npm test`.

<br />
</details>

<details>
  <summary><strong>⚠️ Informações importantes sobre o projeto</strong></summary>

  ## ⚠️ Leia-os atentamente e siga à risca o que for pedido. ⚠️

  ### 👀 Observações importantes:

  Em cada requisito você encontrará uma imagem demonstrando como sua API deverá se comportar, dada a requisição específica.

  O não cumprimento de um requisito, total ou parcialmente, impactará em sua avaliação.

  O projeto possui uma pasta `src`, e é **fortemente recomendável que você construa sua aplicação dentro dessa pasta**.

  **Não é necessário usar o comando `npx sequelize-cli init`** uma vez que já é fornecido no projeto.

  #### Arquivos importantes

  ⚠️ Essa pasta ainda conta com alguns arquivos auxiliares que serão consumidos pelo avaliador e **não devem ser apagados em nenhuma hipótese**:

  > `src/api.js`
  ```javascript
  const express = require('express');

  // ...

  const app = express();

  app.use(express.json());

  // ...

  // É importante exportar a constante `app`, 
  // para que possa ser utilizada pelo arquivo `src/server.js`
  module.exports = app;
  ```
  Que ficará responsável por receber **as definições de middlewares e rotas** de sua API

  <br />

  ---

  > 👉 `src/server.js`
  ```javascript
  const app = require('./api');

  // não remova a variável `API_PORT` ou o `listen`
  const port = process.env.API_PORT || 3000;

  // não remova esse endpoint
  app.get('/', (request, response) => {
    response.send();
  });

  app.listen(port, () => console.log('ouvindo porta', port));
  ```
  Que ficará responsável por iniciar sua API

  <br />

  ---

  > 👉 `src/database/config/config.js`
  ```javascript
  require('dotenv').config();

  const environment = process.env.NODE_ENV || 'test';

  const suffix = {
    dev: '-dev',
    development: '-dev',
    test: '-test',
  };

  const options = {
    host: process.env.HOSTNAME || process.env.MYSQL_HOST || 'localhost',
    port: process.env.MYSQL_PORT || '3306',
    database: 
      `${process.env.MYSQL_DB_NAME || 'blogs-api'}${suffix[environment] || suffix.test}`,
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '1234',
    dialect: 'mysql',
    dialectOptions: {
      timezone: 'Z',
    },
    logging: process.env.DEBUG !== 'false',
  };

  module.exports = {
    development: {
      ...options,
    },
    test: {
      ...options,
    },
  };
  ```
  Que é o arquivo de configuração principal do *Sequelize*

  <br />

  ---

  > 👉 `.sequelizerc`
  ```javascript
  const path = require('path');

  module.exports = {
    'config': path.resolve('src', 'database', 'config', 'config.js'),
    'models-path': path.resolve('src', 'database', 'models'),
    'seeders-path': path.resolve('src', 'database', 'seeders'),
    'migrations-path': path.resolve('src', 'database', 'migrations'),
  };
  ```
  Responsável por identificar os caminhos dos recursos do Sequelize

  <br />

  ---

  **Você irá precisar configurar as variáveis de ambiente para uso do MySQL.** Você pode usar esse [Conteúdo de variáveis de ambiente com NodeJS](https://dev.to/pauloricardoz/usando-variaveis-de-ambiente-em-nodejs-env--4ioi) como referência.

  O arquivo a seguir, contém um modelo das variáveis de ambiente utilizadas no projeto. Para o contexto de teste local, é importante configurar as variáveis: `MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`:

  > 👉 `.env.example`
  ```env
  #### SERVER VARS
  NODE_ENV=development
  API_PORT=3000

  #### DATABASE VARS
  MYSQL_HOST=localhost
  MYSQL_PORT=3306
  MYSQL_DB_NAME=blogs-api
  MYSQL_USER=root
  MYSQL_PASSWORD=password

  #### SECRECT VARS
  JWT_SECRET=suaSenhaSecreta
  ```

  #### Variável `JWT_SECRET`:
  
  Esta variável de ambiente deverá ser utilizada tanto para criar o token quanto para verificá-lo. Os teste locais e o avaliador vão utilizar a variável de ambiente `JWT_SECRET` para testar os requisitos

  **:warning:️ Variáveis de ambiente além das especificadas acima não são suportadas, pois não são esperadas pelo avaliador do projeto.**

<br />
</details>

<details>
  <summary><strong>👀 Dicas</strong></summary>

  #### Status HTTP

  Tenha em mente que todas as "respostas" devem respeitar os [status do protocolo HTTP](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Status) com base no que o REST prega.

  Alguns exemplos:
  - Requisições que precisam de token mas não o receberam devem retornar um código de `status 401`;

  - Requisições que não seguem o formato pedido pelo servidor devem retornar um código de `status 400`;

  - Um problema inesperado no servidor deve retornar um código de `status 500`;

  - Um acesso ao criar um recurso, no nosso caso usuário ou post, deve retornar um código de `status 201`.

</details>

<details>
  <summary  id="diagrama"><strong>🎲 Diagrama ER e Entidades</strong></summary>

  #### Diagrama de Entidade-Relacionamento

  Para orientar a construção das tabelas através do ORM, utilize o *DER* a seguir:

  ![DER](./public/der.png)

  ---

  #### Formato das entidades

  O seu projeto deverá usar o `ORM Sequelize` para criar e atualizar o seu banco de dados. 

  Os primeiros requisitos do projeto devem orientar a produção de suas migrations para gerar:

  - Uma tabela chamada **Users**, contendo dados com a seguinte estrutura:

    ```json
    {
      "id": 1,
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com", // tem quer ser único
      "password": "123456",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
    ```
  - Uma tabela chamada **Categories**, contendo dados com a seguinte estrutura:

    ```json
    {
      "id": 18,
      "name": "News"
    }
    ```

  - Uma tabela chamada **BlogPosts**, contendo dados com a seguinte estrutura:

    ```json
    {
      "id": 21,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 14, // Chave estrangeira, referenciando o id de `Users`
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.947Z",
    }
    ```

  - Uma tabela chamada **PostCategories**, contendo uma **chave primária composta** utilizando os dois atributos da estrutura:

    ```json
    {
      "postId": 50, // Chave primária e estrangeira, referenciando o id de `BlogPosts`
      "categoryId": 20 // Chave primária e estrangeira, referenciando o id de `Categories`
    }
    ```
    *Os dados acima são fictícios, e estão aqui apenas como exemplo*

    > :warning:️ Em caso de dúvidas, consulte os conteúdos:
    > - [Transformando ideias em um modelo de banco de dados](https://app.betrybe.com/course/back-end/funcoes-sql-joins-e-normalizacao/transformando-ideias-em-um-modelo-de-banco-de-dados/a7326a61-117a-4d2f-a640-9e312b6f973b) *(Em `Database Design - Como modelar um banco de dados` > `4) Criando e modelando tabelas de acordo com um diagrama ER`)*
    > - [ORM - Interface da aplicação com o banco de dados](https://app.betrybe.com/course/back-end/nodejs-orm-autenticacao/orm-interface-da-aplicacao-com-o-banco-de-dados/d0fc385e-b0ce-4b3d-8246-779d5dc13682) *(Em `Migrações`)*
    > - [ORM - Associations](https://app.betrybe.com/course/back-end/nodejs-orm-autenticacao/orm-associations/043e2e8a-c28e-4b95-a949-b7c43221ca8d) *(Em `Relacionamentos N:N`)*  

    ---

    #### Dicas de scripts prontos

    - Deleta o banco de dados:
    ```json
    "drop": "npx sequelize-cli db:drop"
    ```

    - Cria o banco e gera as tabelas:
    ```json
    "prestart": "npx sequelize-cli db:create && npx sequelize-cli db:migrate"
    ```

    - Insere dados/Popula a tabela:
    ```json
    "seed": "npx sequelize-cli db:seed:all"
    ```

    **:eyes: OBS**: Os testes irão rodar através do seu migrate usando os scripts acima, também listados no `package.json`.

    **⚠️ Preste bastante atenção, pois a alteração desses scripts pode impedir o avaliador de funcionar corretamente**

    **:warning:️ Haverá um arquivo na pasta `/seeders`, que irá conter as queries para inserção no banco de dados. `Não a remova, pois o avaliador depende dela`.**

<br />
</details>

<details>
  <summary><strong>🗣 Me dê feedbacks sobre o projeto!</strong></summary>

  :warning: **O avaliador automático não necessariamente avalia seu projeto na ordem em que os requisitos aparecem no readme. Isso acontece para deixar o processo de avaliação mais rápido. Então, não se assuste se isso acontecer, ok?**

<br />
</details>

<br />

# Requisitos Obrigatórios

## 1 - Crie migrations para as entidades Users, Categories, BlogPosts, PostCategories

- Esse teste fará uma conexão no banco utilizando a configuração de teste do arquivo `src/database/config/config.js`;
- Suas `migrations` devem estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Suas `migrations` devem respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama).
- Exclua na pasta `./src/database/migrations/`, o arquivo `remove-me.js`.

<details>
  <summary><strong>Os seguintes pontos serão avaliados:</strong></summary>

  * **[Será validado que é possível fazer um INSERT e um SELECT na tabela Users]**
    - O avaliador irá inserir um dado de exemplo na tabela `Users`;
    - O avaliador irá fazer um select, desse mesmo dado, na tabela `Users`.

  * **[Será validado que é possível fazer um INSERT e um SELECT na tabela Categories]**
    - O avaliador irá inserir um dado de exemplo na tabela `Categories`;
    - O avaliador irá fazer um select, desse mesmo dado, na tabela `Categories`.

  * **[Será validado que, a partir de um INSERT em User, é possível fazer um INSERT e um SELECT na tabela BlogPosts]**
    - Dado que `BlogPosts` possui **uma chave estrangeira** `userId`:
      - O avaliador irá inserir um dado de exemplo na tabela `Users`;
    - Desse modo:
      - O avaliador irá inserir um dado de exemplo na tabela `BlogPosts`;
      - O avaliador irá fazer um select, desse mesmo dado, na tabela `BlogPosts`.

  * **[Será validado que, a partir de INSERTs em User, Categories e BlogPosts, é possível fazer um INSERT e um SELECT na tabela PostCategories]**
    - Dado que `PostCategories` possui **uma chave primária composta de duas chaves estrangeiras**, respectivamente, `postId`, `categoryId`:
      - O avaliador irá inserir um dado de exemplo na tabela `Users`;
      - O avaliador irá inserir um dado de exemplo na tabela `Categories`;
      - O avaliador irá inserir um dado de exemplo na tabela `BlogPosts`;
    - Desse modo:
      - O avaliador irá inserir um dado de exemplo na tabela `PostCategories`;
      - O avaliador irá fazer um select, desse mesmo dado, na tabela `PostCategories`.

<br />
</details>

---

## 2 - Crie o modelo 'User' em 'src/database/models/user.js' com as propriedades corretas

- Sua `model` deve estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Sua `model` deve respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama).

<details>
  <summary><strong>Os seguintes pontos serão avaliados:</strong></summary>

  * **[Será validado que existe o arquivo 'user.js']**

  * **[Será validado que o modelo possui o nome 'User']**

  * **[Será validado que o modelo possui a propriedade 'id']**

  * **[Será validado que o modelo possui a propriedade 'displayName']**

  * **[Será validado que o modelo possui a propriedade 'email']**

  * **[Será validado que o modelo possui a propriedade 'password']**

  * **[Será validado que o modelo possui a propriedade 'image']**

<br />
</details>

---

## 3 - Sua aplicação deve ter o endpoint POST `/login`

- O endpoint deve ser acessível através do URL `/login`;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "email": "lewishamilton@gmail.com",
    "password": "123456"
  }
  ```

<details>
  <summary><strong>Os seguintes pontos serão avaliados:</strong></summary>

  * **[Será validado que não é possível fazer login sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Será validado que não é possível fazer login com um usuário que não existe]**
    - Se a requisição receber um par de `email` e `password` errados/inexistentes, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Invalid fields"
    }
    ```
  
  * **[Será validado que é possível fazer login com sucesso]**
    - Se o login foi feito com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
    }
    ```
    > :warning: O token anterior é fictício, seu token deve ser gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e não deve conter o atributo `password` em sua construção.

<br />
</details>

---

## 4 - Sua aplicação deve ter o endpoint POST `/user`

- O endpoint deve ser acessível através do URL `/user`;
- O endpoint deve ser capaz de adicionar um novo `user` a sua tabela no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que não é possível cadastrar com o campo `displayName` menor que 8 caracteres]**
    - Se a requisição não tiver o campo `displayName` devidamente preenchido com 8 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"displayName\" length must be at least 8 characters long"
    }
    ```
  
  * **[Será validado que não é possível cadastrar com o campo `email` com formato inválido]**
    - Se a requisição não tiver o campo `email` devidamente preenchido com o formato `<prefixo@dominio>`, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"email\" must be a valid email"
    }
    ```

  * **[Será validado que não é possível cadastrar com o campo `password` menor que 6 caracteres]**
    - Se a requisição não tiver o campo `password` devidamente preenchido com 6 caracteres ou mais, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"password\" length must be at least 6 characters long"
    }
    ```

  * **[Será validado que não é possível cadastrar com um email já existente]**
    - Se a requisição enviar o campo `email` com um email que já existe, o resultado retornado deverá ser conforme exibido abaixo, com um status http `409`:
    ```json
    {
      "message": "User already registered"
    }
    ```
  
  * **[Será validado que é possível cadastrar um pessoa usuária com sucesso]**
    - Se o user for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
      {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
      }
      ```
    > :warning: O token anterior é fictício, seu token deve ser gerado a partir da variável de ambiente `JWT_SECRET`, do `payload` da requisição e não deve conter o atributo `password` em sua construção.

<br />
</details>

---

## :warning: Validando token nas requisições

- Após termos feito o requisito de criação de `users` e o requisito de `login`, alguns requisitos abaixo vão precisar desta autenticação prévia, para que seja possível consumir o endpoint;
- Todo requisito que precisar validar o `token` terá o símbolo ☝;
- **✨ Dica:** Se é algo que vamos utilizar em mais de uma rota, será que podemos separa-lo em algum lugar que comece com `M` de `middleware`? 😜

<details>
  <summary id="validandoToken"><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que não é possível fazer uma operação sem o token na requisição]**
    - Se o token for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Token not found"
    }
    ```

  * **[Será validado que não é possível fazer uma operação com o token inválido]**
    - Se o token for inválido o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`:
    ```json
    {
      "message": "Expired or invalid token"
    }
    ```

</details>

---

## 5 - Sua aplicação deve ter o endpoint GET `/user`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/user`;
- O endpoint deve ser capaz de trazer todos `users` do banco de dados;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar todos os usuários]**
    - Ao listar usuários com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },

      /* ... */
    ]
    ```

<br />
</details>

---

## 6 - Sua aplicação deve ter o endpoint GET `/user/:id`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/user/:id`;
- O endpoint deve ser capaz de trazer o `user` baseado no `id` do banco de dados se ele existir;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar um usuário específico com sucesso]**
    - Ao listar um usuário com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    }
    ```

  * **[Será validado que não é possível listar um usuário inexistente]**
    - Se o usuário for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "User does not exist"
    }
    ```

<br />
</details>

---

## 7 - Crie o modelo 'Category' em 'src/database/models/category.js' com as propriedades corretas

- Sua `model` deve estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Sua `model` deve respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama).

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que existe o arquivo 'category.js']**

  * **[Será validado que o modelo possui o nome 'Category']**

  * **[Será validado que o modelo possui a propriedade 'id']**

  * **[Será validado que o modelo possui a propriedade 'name']**

<br />
</details>

---

## 8 - Sua aplicação deve ter o endpoint POST `/categories`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/categories`;
- O endpoint deve ser capaz de adicionar uma nova categoria a sua tabela no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "name": "Typescript"
  }
  ```

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que não é possível cadastrar uma categoria sem o campo `name`]**
    - Se a requisição não tiver o campo `name` devidamente preenchidos(não pode haver campo em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "\"name\" is required"
    }
    ```

  * **[Será validado que é possível cadastrar uma categoria com sucesso]**
    - Se a categoria for criada com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
    ```json
    {
      "id": 3,
      "name": "Typescript"
    }
    ```

<br />
</details>

---

## 9 - Sua aplicação deve ter o endpoint GET `/categories`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/categories`;
- O endpoint deve ser capaz de trazer todas categorias do banco de dados;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar todas as categoria com sucesso]**
    - Ao listar categorias com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
          "id": 1,
          "name": "Inovação"
      },
      {
          "id": 2,
          "name": "Escola"
      },

      /* ... */
    ]
    ```

<br />
</details>

---

## 10 - Crie o modelo 'BlogPost' em 'src/database/models/blogPost.js' com as propriedades e associações corretas

- Sua `model` deve estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Sua `model` deve respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama);
- Sua `model` deve respeitar a associação correta *(N:1)* com o modelo `User`;

- **✨ Dica:**
  - Explore como renomear campos no Sequelize;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que existe o arquivo 'blogPost.js']**

  * **[Será validado que o modelo possui o nome 'BlogPost']**

  * **[Será validado que o modelo possui a propriedade 'id']**

  * **[Será validado que o modelo possui a propriedade 'title']**

  * **[Será validado que o modelo possui a propriedade 'content']**

  * **[Será validado que o modelo possui a propriedade 'userId']**

  * **[Será validado que o modelo possui a propriedade 'published']**

  * **[Será validado que o modelo possui a propriedade 'updated']**

  * **[Será validado que o modelo em 'blogPost.js', define a associação 'belongsTo', com a entidade de nome 'User']**

  * **[Será validado que o modelo em 'user.js', define a associação 'hasMany', com a entidade de nome 'BlogPost']**

<br />
</details>

---

## 11 - Crie o modelo 'PostCategory' em 'src/database/models/postCategory.js' com as propriedades e associações corretas

- Sua `model` deve estar no diretório correto e respeitar a nomenclatura pedida no requisito;
- Sua `model` deve respeitar o _diagrama de Entidade-Relacionamento_ e o _formato das entidades_, como descrito na seção de [Diagrama ER e Entidades](#diagrama);
- Sua `model` deve respeitar a associação correta *(N:N)* entre o modelo `BlogPost` e o modelo `Category`;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * **[Será validado que existe o arquivo 'postCategory.js']**

  * **[Será validado que o modelo possui o nome 'PostCategory']**

  * **[Será validado que o modelo possui a propriedade 'postId']**

  * **[Será validado que o modelo possui a propriedade 'categoryId']**

  * **[Será validado que o modelo em 'postCategory.js', através do(s) modelos(s) de nome(s) 'Category; BlogPost', define a associação 'belongsToMany' respectivamente, com o(s) modelo(s) de nome(s) 'BlogPost, Category']**

<br />
</details>

---

## 12 - Sua aplicação deve ter o endpoint POST `/post`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post`;
- O endpoint deve ser capaz de adicionar um novo blog post e vinculá-lo às categorias em suas tabelas no banco de dados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```
  

- **✨ Dicas:**
  - Explore outros [find na documentação do Sequelize](https://sequelize.org/docs/v6/core-concepts/model-querying-finders/#findandcountall);
  - Explore outros [insert na documentação do Sequelize](https://sequelize.org/docs/v6/core-concepts/model-querying-basics/#creating-in-bulk);
  - Explore a seção [Transações do dia 24.2 no course](https://app.betrybe.com/course/back-end/nodejs-orm-autenticacao/orm-associations/043e2e8a-c28e-4b95-a949-b7c43221ca8d/conteudos/5a2fce85-9b17-4061-8859-47da08ed1155/transacoes/e0bbdd2e-97ea-4a9d-8f90-4feab0e5657d?use_case=side_bar), essa seção vai deixar suas aplicações com mais confiablidade e atomicidade, quando o assunto for transações de banco de dados;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que não é possível cadastrar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Será validado que não é possível cadastrar um blogpost com uma `categoryIds` inexistente]**
    - Se a requisição não tiver o campo `categoryIds` devidamente preenchido com um array com pelo menos uma categoria que exista, o resultado retornado deverá ser conforme exibido abaixo, com um status http `400``:
    ```json
    {
      "message": "\"categoryIds\" not found"
    }
    ```

  * **[Será validado que é possível cadastrar um blogpost com sucesso]**
  - Se o blog post for criado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `201`:
  ```json
  {
    "id": 3,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "updated": "2022-05-18T18:00:01.196Z",
    "published": "2022-05-18T18:00:01.196Z"
  }
  ```

<br />
</details>

---

## 13 - Sua aplicação deve ter o endpoint GET `/post`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post`;
- O endpoint deve ser capaz de trazer todos os blogs post, user dono dele e as categorias do banco de dados;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar blogpost com sucesso]**
    - Ao listar posts com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    [
      {
        "id": 1,
        "title": "Post do Ano",
        "content": "Melhor post do ano",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 1,
            "name": "Inovação"
          }
        ]
      },
      
      /* ... */
    ]
    ```

<br />
</details>

---

## 14 - Sua aplicação deve ter o endpoint GET `/post/:id`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post/:id`;
- O endpoint deve ser capaz de trazer o blog post baseado no `id` do banco de dados se ele existir;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível listar um blogpost com sucesso]**
    - Ao listar um post com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 1,
      "title": "Post do Ano",
      "content": "Melhor post do ano",
      "userId": 1,
      "published": "2011-08-01T19:58:00.000Z",
      "updated": "2011-08-01T19:58:51.000Z",
      "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
          {
              "id": 1,
              "name": "Inovação"
          }
      ]
    }
    ```

  * **[Será validado que não é possível listar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## 15 - Sua aplicação deve ter o endpoint PUT `/post/:id`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post/:id`;
- O endpoint deve ser capaz de alterar um post do banco de dados, se ele existir;
- Sua aplicação só deve permitir a alteração de um blog post caso a pessoa seja dona dele;
- Sua aplicação não deve permitir a alteração das categorias do post, somente os atributos `title` e `content` podem ser alterados;
- O corpo da requisição deverá seguir o formato abaixo:
  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```
  

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que não é possível editar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá editá-lo, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[Será validado que não é possível editar sem todos os campos preenchidos]**
    - Se a requisição não tiver todos os campos devidamente preenchidos(não pode haver campos em branco), o resultado retornado deverá ser conforme exibido abaixo, com um status http `400`:
    ```json
    {
      "message": "Some required fields are missing"
    }
    ```

  * **[Será validado que é possível editar um blogpost com sucesso]**
    - Se o blog post for alterado com sucesso o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    {
      "id": 3,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2022-05-18T18:00:01.000Z",
      "updated": "2022-05-18T18:07:32.000Z",
      "user": {
        "id": 1,
        "displayName": "Lewis Hamilton",
        "email": "lewishamilton@gmail.com",
        "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
      },
      "categories": [
        {
          "id": 1,
          "name": "Inovação"
        },
        {
          "id": 2,
          "name": "Escola"
        }
      ]
    }
    ```

<br />
</details>

---

# Requisitos Bônus

## 16 - Sua aplicação deve ter o endpoint DELETE `/post/:id`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post/:id`;
- O endpoint deve ser capaz de deletar um blog post baseado no `id` do banco de dados se ele existir;
- Sua aplicação só deve permitir a deleção de um blog post caso a pessoa seja dona dele;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que não é possível deletar um blogpost com outro usuário]**
    - Somente o user que criou o blog post poderá deletá-lo, o resultado retornado deverá ser conforme exibido abaixo, com um status http `401`
    ```json
      {
        "message": "Unauthorized user"
      }
    ```

  * **[Será validado que é possível deletar um blogpost com sucesso]**
    - Se o blog post for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:

  * **[Será validado que não é possível deletar um blogpost inexistente]**
    - Se o post for inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `404`:
    ```json
    {
      "message": "Post does not exist"
    }
    ```

<br />
</details>

---

## 17 - Sua aplicação deve ter o endpoint DELETE `/user/me`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/user/me`;
- O endpoint deve ser capaz de deletar você do banco de dados, baseado no `id` que esta dentro do seu `token`;
- Sua aplicação deve ser capaz de utilizar o token de autenticação nos headers, para saber o user logado correspondente á ser apagado;

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível excluir meu usuário com sucesso]**
    - Se o user for deletado com sucesso não deve ser retornada nenhuma resposta, apenas um status http `204`:

<br />
</details>

---

## 18 - Sua aplicação deve ter o endpoint GET `/post/search?q=:searchTerm`

- ☝ Não esqueça de validar o `token` neste requisito, como descrito na seção de [Validando token nas requisições](#validandoToken);
- O endpoint deve ser acessível através do URL `/post/search`;
- O endpoint deve ser capaz de trazer os blogs post baseados no `q` do banco de dados, se ele existir;
- Sua aplicação deve ser capaz de retornar um array de blogs post que contenham em seu título ou conteúdo o termo passado na URL;
- Sua aplicação deve ser capaz de retornar um array vázio caso nenhum blog post satisfaça a busca;
- O query params da requisição deverá seguir o formato abaixo:
  ```js
    http://localhost:PORT/post/search?q=vamos
  ```

- **✨ Dica:**
  - Explore como fazer LIKE no Sequelize igual aprendemos no [dia 20.3 - Pesquisas mais dinâmicas e maleáveis com LIKE do course](https://app.betrybe.com/course/back-end/introducao-a-sql/filtrando-dados-de-forma-especifica/9464be4d-cfd8-4fd0-9b31-f037b3c62bff/conteudos/8ab54a4e-f823-4998-a267-297ff542de96/como-criar-pesquisas-mais-dinamicas-e-maleaveis-usando-o-like/1aee7e62-e43f-4a51-ad03-d064dcc68aed?use_case=side_bar);

<details>
  <summary><strong>Os seguintes pontos serão avaliados</strong></summary>

  * ☝ **[Será validado o token, como descrito na seção de [Validando token nas requisições](#validandoToken)]**

  * **[Será validado que é possível buscar um blogpost pelo `title`]**
    - Se a buscar for pelo `title` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
    // GET /post/search?q=Vamos que vamos

    [
      {
        "id": 2,
        "title": "Vamos que vamos",
        "content": "Foguete não tem ré",
        "userId": 1,
        "published": "2011-08-01T19:58:00.000Z",
        "updated": "2011-08-01T19:58:51.000Z",
        "user": {
          "id": 1,
          "displayName": "Lewis Hamilton",
          "email": "lewishamilton@gmail.com",
          "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
        },
        "categories": [
          {
            "id": 2,
            "name": "Escola"
          }
        ]
      }
    ]
    ```

  * **[Será validado que é possível buscar um blogpost pelo `content`]**
    - Se a buscar for pelo `content` o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=Foguete não tem ré

      [
        {
          "id": 2,
          "title": "Vamos que vamos",
          "content": "Foguete não tem ré",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 2,
              "name": "Escola"
            }
          ]
        }
      ]
    ```

  * **[Será validado que é possível buscar todos os blogpost quando passa a busca vazia]**
    - Se a buscar for vazia o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=

      [
        {
          "id": 1,
          "title": "Post do Ano",
          "content": "Melhor post do ano",
          "userId": 1,
          "published": "2011-08-01T19:58:00.000Z",
          "updated": "2011-08-01T19:58:51.000Z",
          "user": {
            "id": 1,
            "displayName": "Lewis Hamilton",
            "email": "lewishamilton@gmail.com",
            "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
          },
          "categories": [
            {
              "id": 1,
              "name": "Inovação"
            }
          ]
        },
        
        /* ... */
      ]
    ```

  * **[Será validado que é possível buscar um blogpost inexistente e retornar array vazio]**
    - Se a buscar um post inexistente o resultado retornado deverá ser conforme exibido abaixo, com um status http `200`:
    ```json
      // GET /post/search?q=BATATA

      []
    ```

</details>
