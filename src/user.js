import mongoose from 'mongoose';
import _ from 'lodash';

const order = new mongoose.Schema({
  nama: {
    type: String,
  },
  phonenum: {
    type: Number,
    minlength: 13,
  },
  jumpenumpang: {
    type: Number,
  },
  rute: {
    type: String,
  },
  tanggal: {
    type: String, // definisi awal
  },
  maskapai: {
    type: String,
    minlength: 15,
  },
  jam: {
    type: String,
  },
  alamatjemput: {
    type: String,
  },
  alamattujuan: {
    type: String,
  },
});

order.methods.toJson = function () {
  const user = this;
  const userObject = user.toObject();
  return _.pick(userObject, ['_id', 'nama']);
};

const user = mongoose.model('user', order);

export default user;
