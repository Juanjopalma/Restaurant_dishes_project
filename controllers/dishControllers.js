const connection = require('../config/db');

class DishControllers {
  // enseña la página con todas los platos
  // localhost:3003/dish
  showAllDishes = (req, res) => {
    let sql = `SELECT * FROM dish WHERE dish_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if(err) throw err; 
      res.render('allDishes', {result});
    })
  }

  // abre formulario de creación del plato al que le mandamos el id del restaurante
  // localhost:3003/dish/createDish
  viewCreateDish = (req, res) => {  
    let id = req.params.id;   // recuperamos el id del restaurante
    res.render('formDish', {restaurant_id:id});
  }

  // recoge los datos de la obra y recupera del params el id del artista 
  createDish = (req, res) => {
    let id = req.params.id;  // id del restaurante
    const {dish_name, dish_description} = req.body;
    if (
      dish_name === "" || 
      dish_description === ""
    ){
      return res.render('formDish', {restaurant_id:id, message: "rellene todos los campos, por favor"});
    }
    let sql = `INSERT INTO dish (dish_name, dish_description, restaurant_id, dish_img) VALUES ("${dish_name}", "${dish_description}", "${id}", "user.png")`; 

    if (req.file != undefined) {
      let img = req.file.filename; 
      sql = `INSERT INTO dish (dish_name, dish_description, restaurant_id, dish_img) VALUES ("${dish_name}", "${dish_description}", "${id}", "${img}")`; 
      }
      connection.query(sql, (err, result) => {
        if(err) throw err; 
        res.redirect(`/restaurant/twoRestaurant/${id}`);
      })
    }

    // borra totalmente un plato
    totalDelete = (req, res) => {
      let {id, restaurant_id} = req.params; // id del plato
      let sql = `DELETE FROM dish WHERE dish_id = ${id}`; 
  
      connection.query(sql, (err, result) => {
        if(err) throw err; 
        res.redirect(`/restaurant/twoRestaurant/${restaurant_id}`);
      })
    }

    // borrado lógico de un plato
    logicDelete = (req, res) => {
      let {id, restaurant_id} = req.params; // id del plato
      let sql = `UPDATE dish SET dish_isdeleted = 1 WHERE dish_id = ${id}`;
      connection.query(sql, (err, result) => {
        if(err) throw err;
        res.redirect(`/restaurant/twoRestaurant/${restaurant_id}`);
      })
    }

    // abre el formulario de edición de un plato
    // localhost:3003/dish/editDish/id
    showEditDish = (req, res) => {
      let id = req.params.id; 
      let sql = `SELECT * FROM dish WHERE dish_id = ${id} AND dish_isdeleted = 0`; 

      connection.query(sql, (err, result) => {
        if(err) throw err;
        res.render('editFormDish', {result});
      })
    }

    // recoge los datos del formulario para guardar en db
    editDish = (req, res) => {
      let id = req.params.id; 
      const {dish_name, dish_description} = req.body;
      let sql = `UPDATE dish SET dish_name = "${dish_name}", 
      dish_description = "${dish_description}" WHERE dish_id = ${id}`;
  
      if (req.file != undefined) {
        let img = req.file.filename;
        sql = `UPDATE dish SET dish_name = "${dish_name}", 
        dish_description = "${dish_description}", dish_img = "${img}" WHERE dish_id = ${id}`; 
      }
  
      connection.query(sql, (err, result) => {
        if(err) throw err; 
        res.redirect(`/dish`)
      })
    }


}

module.exports = new DishControllers; 

