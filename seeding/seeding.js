const Database = require('../server/database.js').

Database.CreateMainDatabase('rewhy', (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log('Database Seeded');
  }
});