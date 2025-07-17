const { Router } = require('express');
const passport = require('passport');

const postCtrl = require('../controller/postController');

const router = Router();

// Get ////////////////////////////////////////////////////////////

router.get(
  '/api/posts/published',
  passport.authenticate('jwt', { session: false }),
  postCtrl.getAllPublishedPosts
);

router.get(
  '/api/posts',
  passport.authenticate('jwt', { session: false }),
  postCtrl.getAllPosts
);

router.get(
  '/api/post/:postId/comments',
  passport.authenticate('jwt', { session: false }),
  postCtrl.getPostComments
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

router.post(
  '/api/comment/:postId',
  passport.authenticate('jwt', { session: false }),
  postCtrl.createComment
);

// ________________________________________________________________

//

// Put ///////////////////////////////////////////////////////////

router.put(
  '/api/post/edit/:postId',
  passport.authenticate('jwt', { session: false }),
  postCtrl.editPost
);

// ________________________________________________________________

// Put ///////////////////////////////////////////////////////////

router.delete(
  '/api/post/:postId',
  passport.authenticate('jwt', { session: false }),
  postCtrl.deletePost
);

router.delete(
  '/api/comment/:commentId',
  passport.authenticate('jwt', { session: false }),
  postCtrl.deleteComment
);

// ________________________________________________________________

module.exports = router;
