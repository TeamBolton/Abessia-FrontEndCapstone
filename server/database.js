const Seed = require('./seedDB.js');

const CreateMainDatabase = function (database, callback) {
  const Data = Seed.generateProductsTable(100);
  const Connection = Seed.makeConnection(database);
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

CreateMainDatabase('rewhy', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database Seeded');
  }
});