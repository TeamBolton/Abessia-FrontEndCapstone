const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const database = require('./database.js');
const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use('/:id', express.static(__dirname + '/../public'));
app.use(express.static(__dirname + '/../public'));

app.get('/api/products/photos/:id', (req, res) => {
  if (!req) {
    console.error('Error on basic GET request');
  } else {
    let productID = req.params.id;
    database.RetrieveData(productID, (error, response) => {
      if (error) {
        console.error(error);
        res.end();
      } else {
        res.send(response);
      }
    })
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})