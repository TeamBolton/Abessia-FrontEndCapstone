const Seed = require('./seedDB.js');
const Config = require('./config.js');

const Connection = Seed.makeConnection('rewhyimages');

const CreateMainDatabase = function (database, callback) {
  const Data = Seed.generateProductsTable(100);
  Connection.connect((error) => {
    if (error) {
      callback(error);
    } else {
      Seed.seedDataBase(Data, Connection, 'products', (oops) => {
        if (oops) {
          callback(oops);
        } else {
          callback(null);
        }
      })
    }
  })
}

const RetrieveData = function (productID, callback) {
  Connection.query(`SELECT * FROM products WHERE id = ${productID};`, (err, res, fields) => {
    if(err) {
      console.error('DB Error: RetrieveData Failed');
      callback(err);
    } else {
      callback(null, res);
    }
  });
};

module.exports = {
  CreateMainDatabase,
  RetrieveData
};