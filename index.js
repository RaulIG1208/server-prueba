require('dotenv').config();

require('./mongo');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const Santo = require('./models/Santo');
const notFound = require('./middleware/notFound');
const handleErrors = require('./middleware/handleErrors');
const jwt = require('jsonwebtoken');
const userRouter = require('./controllers/users');
const User = require('./models/User');
const loginRouter = require('./controllers/login');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hellow World</h1>');
});

app.get('/api/santos', async (req, res) => {
  const santos = await Santo.find({}).populate('user', {
    username: 1,
    name: 1,
  });

  res.json(santos);
});

app.get('/api/santos/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const santo = await Santo.findById(id);
    res.json(santo);
    // const santo = await santos.find((santo) => santo.id === parseInt(id));
    // console.log(santo);
    // res.json(santo);
  } catch (err) {
    next(err);
  }
});

app.put('/api/santos/:id', (req, res, next) => {
  const id = req.params.id;
  const { name, constellation } = req.body;
  const updateSanto = {
    name,
    constellation,
  };
  Santo.findByIdAndUpdate(id, updateSanto, { new: true })
    .then((result) => res.json(result))
    .catch((err) => next(err));
});

app.delete('/api/santos/:id', (req, res, next) => {
  const id = req.params.id;
  Santo.findByIdAndDelete(id)
    .then(() => res.status(204).end())
    .catch((err) => next(err));
});

app.post('/api/santos', async (req, res, next) => {
  const { name, constellation } = req.body;

  /* Realizo la consulta de los parametros necesarios se maneja la logica aqui */

  if (!name) {
    return res.status(400).json({
      error: 'content is missing',
    });
  }
  try {
    const authorization = req.get('Authorization');
    let token = null;
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      token = authorization.substring(7);
    }
    const decodedToken = await jwt.verify(token, process.env.SECRET);
    console.log('hola', decodedToken);

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'token missing or invalid' });
    }
    const { id: userId } = decodedToken;
    const user = await User.findById(userId);

    /** Creo una instancia del modelo para luego guardarlo en la base de datos */
    const newSanto = new Santo({
      name,
      constellation,
      date: new Date().toISOString(),
      user: user._id,
    });

    const saveSanto = await newSanto.save();
    user.santos = [...user.santos, saveSanto._id];
    await user.save();
    res.json(saveSanto);
  } catch (err) {
    next(err);
  }
});

app.use('/api/users', userRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}
app.use(notFound);

app.use(handleErrors);

const port = process.env.PORT;

app.set('port', port);

const server = app.listen(app.get('port'), () => {
  console.log(`Server running on port ${app.get('port')}`);
});

module.exports = { app, server };
