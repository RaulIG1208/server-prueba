const { app, server } = require('../index');
const supertest = require('supertest');
const User = require('../models/User');

const initialSantos = [
  {
    name: 'Seiya',
    date: new Date().toISOString(),
    constellation: 'Pegaso',
  },
  {
    name: 'Shiryu',
    date: new Date().toISOString(),
    constellation: 'Dragon',
  },
];

const api = supertest(app);

const getUsers = async () => {
  const usersDB = await User.find({});
  return usersDB.map((user) => user.toJSON());
};

module.exports = { initialSantos, api, getUsers };
