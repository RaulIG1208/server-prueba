const bcrypt = require('bcrypt');
const userRouter = require('express').Router();

const User = require('../models/User');

userRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('santos', {
    constellation: 1,
    date: 1,
  });
  res.json(users);
});

userRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body;
  console.log(password, username);
  const saltRound = 10;
  const passwordHash = await bcrypt.hash(password, saltRound);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const saveUser = await user.save();

  res.status(201).json(saveUser);
});

module.exports = userRouter;
