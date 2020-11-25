const Database = require('../server/database.js');

Database.CreateMainDatabase('rewhyimages', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database Seeded');
  }
});