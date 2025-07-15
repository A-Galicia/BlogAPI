const passport = require('passport');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../../generated/prisma');

const prisma = new PrismaClient();

exports.createUser = async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await prisma.user.create({
    data: {
      name: req.body.username,
      password: hashedPassword,
      author: false,
    },
  });

  if (!user) {
    res.sendStatus(409);
  } else {
    res.json({ msg: 'Created User' });
  }
};
