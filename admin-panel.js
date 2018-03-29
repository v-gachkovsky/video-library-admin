const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const port = 9010;
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public')));

app.listen(port, () => {
  console.log(`Admin Panel started on port ${port}`);
});
