const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

const PORT = process.env.PORT || 8080;

app.listen(8080, () => {
  console.log(`Listening on PORT ${PORT}`);
});
