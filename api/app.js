const express = require('express');
const authRouter = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', authRouter);

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`Listening on PORT ${PORT}`);
});
