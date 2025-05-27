const validTitle = 'Latest updates, August 1st';
const validCategory = [1, 2];
const validContent = 'The whole text for the blog post goes here in this key';

const notTitle = {
  title: undefined,
  content: validContent,
  categoryIds: [1, 2]
};

const notCategoryId = {
  title: validTitle,
  content: validContent,
  categoryIds: {},
};

const addPost = {
  title: validTitle,
  content: validContent,
  categoryIds: validCategory,
};

const postById = {
  id: 1,
  title: 'Post do Ano',
  content: 'Melhor post do ano',
  userId: 1,
  published: '2011-08-01T19:58:00.000Z',
  updated: '2011-08-01T19:58:51.000Z',
  user: {
    id: 1,
    displayName: 'Lewis Hamilton',
    email: 'lewishamilton@gmail.com',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
  },
  categories: [
    {
      id: 1,
      name: 'Inovação'
    }
  ]
};

module.exports = {
  notTitle,
  notCategoryId,
  addPost,
  postById
};
