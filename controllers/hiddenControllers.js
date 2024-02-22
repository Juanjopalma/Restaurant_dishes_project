const connection = require('../config/db');

class HiddenControllers {

  showAllRestaurantAndDishes = (req, res) => {
    let restaurantSql = `SELECT * FROM restaurant WHERE restaurant_isdeleted = 0`;
    let dishesSql = `SELECT * FROM dish WHERE dish_isdeleted = 0`;

    connection.query(restaurantSql, (err, restaurantResult) => {
      if (err) throw err;

      connection.query(dishesSql, (err, dishesResult) => {
        if (err) throw err;

        res.render('vistaOculta', { restaurants: restaurantResult, dishes: dishesResult });
      });
    });
  }

  // recoge los datos del formulario para guardar en db
  // localhost:3000/restaurant/editRestaurant/id
  editRestaurant = (req, res) => {
    let id = req.params.id;
    const {restaurant_name, cook_style, restaurant_description, phone_number} = req.body;
    let sql = `UPDATE restaurant SET restaurant_name = '${restaurant_name}', cook_style = '${cook_style}', restaurant_description = '${restaurant_description}', phone_number = '${phone_number}' WHERE restaurant_id = ${id}`;
  
    if (req.file != undefined) {
      let img = req.file.filename;
      sql = `UPDATE restaurant SET restaurant_name = '${restaurant_name}', cook_style = '${cook_style}', restaurant_description = '${restaurant_description}', phone_number = '${phone_number}', restaurant_img = '${img}' WHERE restaurant_id = ${id}`;
    }

    connection.query(sql, (err, result) => {
      if(err) throw err; 
      res.redirect(`/hidden/vistaOculta`);
    })
  }

  //borrado permanente de todos los platos del restaurante 
  deleteRestaurant = (req, res) => {
    let id = req.params.id; 
    let sql = `DELETE FROM restaurant WHERE restaurant_id = ${id}`; 
    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/hidden/vistaOculta`);
    })
  }

  // borrado lógico de todos los platos del restaurante
  delLogicRestaurant = (req, res) => {
    let id = req.params.id; 
    let sql = `UPDATE restaurant 
                    LEFT JOIN dish ON restaurant.restaurant_id = dish.restaurant_id SET restaurant.restaurant_isdeleted = 1, dish.dish_isdeleted = 1 WHERE restaurant.restaurant_id = ${id}`;
    connection.query(sql, (err, result) => {
      if(err) throw err; 
      res.redirect('/hidden/vistaOculta');
    })
  }

  // borra totalmente un plato
  deleteDish = (req, res) => {
    let {id, restaurant_id} = req.params; // id del plato
    let sql = `DELETE FROM dish WHERE dish_id = ${id}`; 

    connection.query(sql, (err, result) => {
      if(err) throw err; 
      res.redirect(`/hidden/vistaOculta`);
    })
  }

  // borrado lógico de un plato
  delLogicDish = (req, res) => {
    let {id, restaurant_id} = req.params; // id del plato
    let sql = `UPDATE dish SET dish_isdeleted = 1 WHERE dish_id = ${id}`;
    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/hidden/vistaOculta`);
    })
  }

}

module.exports = new HiddenControllers;