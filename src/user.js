import express from 'express';
import _ from 'lodash';
import User from '../model/user';

const router = express.Router();

router.post('/order', async (req, res) => {
  const body = _.pick(req.body, ['nama', 'phonenum', 'jum_penumpang', 'rute', 'tanggal', 'maskapai', 'jam', 'alamat_jemput', 'alamat_tujuan']);
  const newOrder = new User(body);

  try {
    await newOrder.save();
    return res.send('ok');
  } catch (err) {
    console.log(err);
    return res.status(400).send(err);
  }
});
export default router;
