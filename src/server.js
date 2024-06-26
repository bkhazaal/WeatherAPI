const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('src'))


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/weather.html'));
});

app.listen(port, () => {
  console.log('Server started at http://localhost:' + port);
});
