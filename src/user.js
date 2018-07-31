import express from 'express';
import _ from 'lodash';
import User from '../models/user';

import dbConn from '../../config/database';

const router = express.Router();

router.get('/helloworld', (req, res) => {
  res.send('Hehe bisa');
});

// create Users
router.post('/users', async (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const newUser = new User(body);

  try {
    await newUser.save();
    return res.send('ok');
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

// update Users by email
router.patch('/users/:email', async (req, res) => {
  const body = _.pick(req.body, ['email']);
  try {
    const user = await User.findOne({ email: req.params.email });

    if (!user) {
      throw new Error('user not found');
    }

    const result = await User.findOneAndUpdate({
      email: req.params.email,
    }, {
      email: body.email,
    }, {
      new: true,
    });
    console.log(result);
    return res.send('ok');
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

// read Users by email. hmm still fail
router.get('/users/:email', async (req, res) => {
  const body = _.pick(req.body, ['email']);
  try {
    const user = await User.findOne({ email: req.params.email }, { id: req.params.id });

    if (!user) {
      throw new Error('user not found');
    }

    const result = await User.findOne({
      id: req.params.id,
    }, {
      email: body.email,
    }, {
      new: true,
    });
    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});

// delete Users by email
router.delete('/users/:email', async (req, res) => {
  try {
    const user = await User.findOneAndRemove({ email: req.params.email });

    if (!user) {
      return res.status(400).send();
    }
    return res.send({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error);
  }
});
export default router;
