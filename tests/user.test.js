const mongoose = require('mongoose');
const { server } = require('../index');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { api, getUsers } = require('./helpers');

describe('creating a new user', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('123', 10);
    const user = new User({
      username: 'conan',
      passwordHash,
    });
    await user.save();
  }, 10000);

  test('works as expected creating a fresh username', async () => {
    const usersDB = await User.find({});
    const usersArStart = usersDB.map((user) => user.toJSON());

    const newUser = {
      username: 'ragv1208',
      name: 'Raul',
      password: 'tw1tch',
    };

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const usersDBAfter = await User.find({});
    const usersAtEnd = usersDBAfter.map((user) => user.toJSON());

    expect(usersAtEnd).toHaveLength(usersArStart.length + 1);

    const userNames = usersAtEnd.map((user) => user.username);
    expect(userNames).toContain(newUser.username);
  });

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await getUsers();

    const newUser = {
      username: 'ragv1208',
      name: 'Raul',
      password: 'tw1tch',
    };

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    expect(result.body.error).toContain("'username' to be unique");

    const usersAtEnd = await getUsers();

    expect(usersAtEnd).toHaveLength(usersAtStart.length);
  }, 10000);

  afterAll(() => {
    server.close();
    mongoose.disconnect();
  });
});
