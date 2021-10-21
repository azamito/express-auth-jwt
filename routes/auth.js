const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Import Validation
const { regValid, logValid } = require('../validation');

// Rute pendaftaran user
router.post('/register', async (req, res) => {
  // Validasi data sebelum mendafatarkan user
  const { error } = regValid(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Periksa email user apakah sudah terdaftar di database?
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('Email sudah terdaftar!');

  // Hash Password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  // Daftarkan user baru
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const saveUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Rute login user
router.post('/login', async (req, res) => {
  const { error } = logValid(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Periksa apakah email sudah ada di database?
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Email belum terdaftar!');

  // Periksa password apakah sudah sesuai dan benar?
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send('Password salah!');

  // Buat dan isikan sebuah token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);

  res.header('auth-token', token).send(token);
})

module.exports = router;