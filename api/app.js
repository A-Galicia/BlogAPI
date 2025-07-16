const express = require('express');
const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRouter);
app.use('/', indexRouter);

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`Listening on PORT ${PORT}`);
});
