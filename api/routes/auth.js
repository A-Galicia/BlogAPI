const { Router } = require('express');
//const bcrypt = require('bcryptjs');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const controller = require('../controller/controller');

const router = Router();

router.get('/api', (req, res) => {
  res.json({
    msg: 'hello',
  });
});

router.post('/api/sign-up', controller.createUser);

module.exports = router;
