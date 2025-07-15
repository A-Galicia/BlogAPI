const { Router } = require('express');
//const bcrypt = require('bcryptjs');
const passport = require('passport');

const userCtrl = require('../controller/userController');

const router = Router();

router.get('/api', (req, res) => {
  res.json({
    msg: 'hello',
  });
});

router.post('/api/sign-up', userCtrl.createUser);

router.post('/api/login', userCtrl.login);

module.exports = router;
