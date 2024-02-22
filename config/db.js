const mysql = require('mysql2'); 

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'restaurants'
}); 

connection.connect(function(err) {
  if(err){
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log('Base de datos conectada ok');
}); 

module.exports = connection;