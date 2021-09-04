const mongoose = require('mongoose');
const { server } = require('../index');
const Santo = require('../models/Santo');
const { initialSantos, api } = require('./helpers');

beforeEach(async () => {
  await Santo.deleteMany({});

  const santo1 = new Santo(initialSantos[0]);
  await santo1.save();

  const santo2 = new Santo(initialSantos[1]);
  await santo2.save();
}, 10000);

test('saints are returned as json', async () => {
  await api
    .get('/api/santos')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('there are thow saints', async () => {
  const response = await api.get('/api/santos');
  expect(response.body).toHaveLength(initialSantos.length);
});

test('there firts note is about Pegaso', async () => {
  const response = await api.get('/api/santos');
  expect(response.body[0].constellation).toBe('Pegaso');
});

test('a valid santo can be added', async () => {
  const newSanto = {
    name: 'Raul',
    date: new Date().toISOString(),
    constellation: 'Leo',
  };

  await api
    .post('/api/santos')
    .send(newSanto)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/santos');
  const constellation = response.body.map((santo) => santo.constellation);
  expect(response.body).toHaveLength(initialSantos.length + 1);
  expect(constellation).toContain(newSanto.constellation);
});

test('saint without name is not added', async () => {
  const newSanto = {
    date: new Date().toISOString(),
    constellation: 'Leo',
  };

  await api
    .post('/api/santos')
    .send(newSanto)
    .expect(400)
    .expect('Content-Type', /application\/json/);

  const response = await api.get('/api/santos');

  expect(response.body).toHaveLength(initialSantos.length);
});

afterAll(async () => {
  await server.close();
  await mongoose.disconnect();
});
