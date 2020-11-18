const mysql = require('mysql');
const Data = require('./fakerData.js');
const Config = require('./config.js');

function makeConnection (dbName) {
  var connection = mysql.createConnection(
    {
      host: Config.SQLConfig.host,
      user: Config.SQLConfig.SQLuser,
      password: Config.SQLConfig.SQLpassword,
      database: dbName
    }
  );
  return connection;
}

//This module iteratively creates sample data to seed into the Products table in the SQL db
function generateProductsTable (size) {
  var productsTable = [];
  for (let i = 0; i < size; i++) {
    productsTable.push(Data.newProduct());
  }
  return productsTable;
};


//This function alone interacts with the database, pushing the seeded productsTable to the db / table
function seedDataBase (data, connection, table, callback) {
  var columns = '(id, name, company, colors, price)';
  var queryStart = `INSERT INTO ${table} ${columns} VAlUES `;

  for (let i = 0; i < data.length; i++) {
    var colorsJSON = JSON.stringify(data[i].colors);
    var id = i + 1;
    var dataString = `(${id}, '${data[i].name}', '${data[i].company}', '${colorsJSON}', '${data[i].price}');`;
    var query = queryStart + dataString;
    connection.query(query, (err, res) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, res);
      }
    });
  }
};

module.exports = {
  generateProductsTable,
  makeConnection,
  seedDataBase
};