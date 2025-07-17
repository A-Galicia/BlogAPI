const { PrismaClient } = require('../../generated/prisma');
const { connect } = require('../routes');

const prisma = new PrismaClient();

exports.createPost = async (req, res) => {
  const author = await req.user;
  const post = await prisma.user.update({
    where: {
      id: author.id,
    },
    data: {
      posts: {
        create: {
          title: req.body.title,
          content: req.body.content,
          publish: req.body.publish,
        },
      },
    },
  });

  if (!post) {
    res.status(409).json({ message: 'Error: author not found' });
  } else {
    res.status(201).json({ post: post });
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
    },
  });

  if (!posts) {
    res.status(409).json({ message: 'Error: no posts' });
  } else {
    res.status(201).json({ posts: posts });
  }
};

exports.getAllPublishedPosts = async (req, res) => {
  const posts = await prisma.post.findMany({
    where: {
      publish: true,
    },
    include: {
      author: true,
    },
  });

  if (!posts) {
    res.status(409).json({ message: 'Error: no posts' });
  } else {
    res.status(201).json({ posts: posts });
  }
};

exports.getPostsByIdOrTitle = async (req, res) => {
  const post = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: req.params.idOrName } },
        { id: { contains: req.params.idOrName } },
      ],
    },
  });

  if (!post) {
    res.status(409).json({ message: 'Error: no posts found', post: post });
  } else {
    res.status(201).json({ post: post });
  }
};

exports.createComment = async (req, res) => {
  const user = await req.user;
  const comment = await prisma.comment.create({
    data: {
      content: req.body.content,
      author: {
        connect: {
          id: user.id,
        },
      },
      post: {
        connect: {
          id: req.params.postId,
        },
      },
    },
  });

  if (!comment) {
    res.status(409).json({ message: 'Error: creation failed' });
  } else {
    res.status(201).json({ message: 'Created comment', comment: comment });
  }
};

exports.getPostComments = async (req, res) => {
  const comments = await prisma.post.findMany({
    where: {
      id: req.params.postId,
    },
    include: {
      comments: {
        include: {
          author: true,
        },
      },
    },
  });

  if (!comments) {
    res.status(409).json({ message: 'Error: comments not found' });
  } else {
    res.status(201).json({ post: comments });
  }
};

exports.editPost = async (req, res) => {
  const post = await prisma.post.update({
    where: {
      id: req.params.postId,
    },
    data: {
      title: req.body.title,
      content: req.body.content,
      publish: req.body.publish,
    },
  });

  if (!post) {
    res.status(409).json({ message: 'Error: post not found' });
  } else {
    res.status(201).json({ post: post });
  }
};

exports.deletePost = async (req, res) => {
  const comments = await prisma.comment.deleteMany({
    where: {
      postId: req.params.postId,
    },
  });
  const post = await prisma.post.delete({
    where: {
      id: req.params.postId,
    },
  });

  if (!post) {
    res.status(409).json({ message: 'Error: post not found' });
  } else {
    res.status(200).json({ post: post });
  }
};

exports.deleteComment = async (req, res) => {
  const comment = await prisma.comment.delete({
    where: {
      id: req.params.commentId,
    },
  });

  if (!comment) {
    res.status(409).json({ message: 'Error: post not found' });
  } else {
    res.status(200).json({ message: 'comment deleted', comment: comment });
  }
};
