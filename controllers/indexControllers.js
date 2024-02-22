const bcrypt = require('bcrypt');
const connection = require('../config/db');


class IndexControllers {
  showAllRestaurant = (req, res) => {
    let sql = `SELECT * FROM restaurant WHERE restaurant_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if(err) throw err; 
      res.render('index', {result});
    })
  }
}

module.exports = new IndexControllers;