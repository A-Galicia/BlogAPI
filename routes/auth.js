const { Router } = require('express');
const passport = require('passport');

const userCtrl = require('../controller/userController');

const router = Router();

// Get ////////////////////////////////////////////////////////////

router.get('/api', (req, res) => {
  res.json({
    msg: 'hello',
  });
});

router.get(
  '/api/profile',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const user = await req.user;
    res.json({
      message: 'in the profile/ protected ',
      user: user,
    });
  }
);

// ________________________________________________________________

//

// Post ///////////////////////////////////////////////////////////

router.post('/api/sign-up', userCtrl.createUser);

router.post('/api/login', userCtrl.login);

// ________________________________________________________________

module.exports = router;
