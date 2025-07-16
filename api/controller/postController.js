const { PrismaClient } = require('../../generated/prisma');

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

  /* const post = await prisma.user.findFirst({
    where: {
      id: author.id,
    },
    include: {
      posts: true,
    },
  }); */

  if (!post) {
    res.status(409).json({ message: 'Error: author not found' });
  } else {
    res.status(201).json({ message: 'Created post', post: post });
  }
};

exports.getAllPosts = async (req, res) => {
  const posts = await prisma.post.findMany();

  if (!posts) {
    res.status(409).json({ message: 'Error: no posts' });
  } else {
    res.status(201).json({ message: 'got all posts', posts: posts });
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
    res.status(201).json({ message: 'got all posts', post: post });
  }
};
