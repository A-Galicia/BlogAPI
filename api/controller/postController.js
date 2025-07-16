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
