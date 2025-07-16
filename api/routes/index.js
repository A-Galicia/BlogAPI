const { Router } = require('express');
const passport = require('passport');

const postCtrl = require('../controller/postController');

const router = Router();

// Get ////////////////////////////////////////////////////////////

router.get(
  '/api/posts',
  passport.authenticate('jwt', { session: false }),
  postCtrl.getAllPosts
);

router.get(
  '/api/post/:idOrName',
  passport.authenticate('jwt', { session: false }),
  postCtrl.getPostsByIdOrTitle
);

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
