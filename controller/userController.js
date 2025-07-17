require('dotenv').config();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('../generated/prisma');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');

// JWT Config /////////////////////////////////////////////////////

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = prisma.user.findFirst({
        where: {
          id: payload.id,
        },
      });
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

//_________________________________________________________________

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
    res.status(409).json({ message: 'Error: username is taken' });
  } else {
    res.status(201).json({ message: 'Created User' });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        name: req.body.username,
      },
    });

    if (!user) return res.status(400).json({ message: 'user does not exist' });

    if (user.name !== req.body.username)
      return res.status(400).json({ message: 'incorrect username' });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ message: 'incorrect password' });

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
      //expires in 6 hours, should last whole workout
    );

    return res
      .status(200)
      .json({ message: 'user logged in', accessToken: accessToken });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
