const { Router } = require('express');
const passport = require('passport');

const postCtrl = require('../controller/postController');

const router = Router();

// Get ////////////////////////////////////////////////////////////

router.get('/api', (req, res) => {
  res.json({
    msg: 'hello',
  });
});

// ________________________________________________________________

//

// Post ///////////////////////////////////////////////////////////

router.post(
  '/api/create-post',
  passport.authenticate('jwt', { session: false }),
  postCtrl.createPost
);

// ________________________________________________________________

module.exports = router;
