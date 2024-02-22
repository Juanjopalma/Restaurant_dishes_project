const bcrypt = require('bcrypt');
const connection = require('../config/db');
const main = require('../utils/nodemailer')

class RestaurantControllers {

  // abre la página con el formulario de registro del restaurante
  // localhost:3003/artist/register
  restaurantRegister = (req, res) => {
    res.render('registerForm');
  }

  // recoja los datos del formulario 
  // localhost:3000/restaurant/register
  createRestaurant = (req, res) => {
    const {restaurant_name, cook_style, restaurant_description, phone_number, email, password, password2} = req.body; 
    if (
      restaurant_name === "" || 
      cook_style === "" || 
      restaurant_description === "" || 
      phone_number === "" || 
      email === "" || 
      password === ""
    ){
      return res.render("registerForm", {message: "rellene todos los campos, por favor"});
    }
    if (password !== password2) {
      return res.render("registerForm", {message: "la contraseña debe ser la misma"});
    }
    // encriptar contraseña
    bcrypt.hash(password, 10, function(err, hash){
      if(err) throw err;

    let sql = `INSERT INTO restaurant (restaurant_name, cook_style, restaurant_description, phone_number, email, password, restaurant_img) VALUES ('${restaurant_name}', '${cook_style}', '${restaurant_description}', '${phone_number}','${email}', '${hash}', 'user.png')`; //hardcodear`

    if(req.file != undefined) {
      let img = req.file.filename; 
      sql = `INSERT INTO restaurant (restaurant_name, cook_style, restaurant_description, phone_number, email, password, restaurant_img) VALUES ('${restaurant_name}', '${cook_style}', '${restaurant_description}', '${phone_number}','${email}', '${hash}', '${img}')`; 
    }
      connection.query(sql, (err, result) => {
        if(err) {
        if(err.errno == 1062){ // error de email duplicado
          return res.render("registerForm", {message: "el email ya existe en la app!"});
        } else {
          throw err;
        }
      }
      main();
      res.redirect("/#section2");
      })
    })
  }

  // abre la página con info de un artista determinado
  // localhost:3000/restaurant/oneRestaurant/1 
  viewOneRestaurant = (req, res) => {
    let id = req.params.id; 
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} and restaurant_isdeleted = 0`;
    let sql_dishes = `SELECT * FROM dish WHERE restaurant_id = ${id} AND dish_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if(err) throw err; 
      connection.query(sql_dishes, (err_d, result_d) => {
        if(err_d) throw err_d; 
        res.render('oneRestaurant', {result, result_d});
      })
    })
  }

  // abre la página con info de un artista determinado
  // localhost:3003/restaurant/oneRestaurant/1 
  viewTwoRestaurant = (req, res) => {
    let id = req.params.id; 
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} and restaurant_isdeleted = 0`;
    let sql_dishes = `SELECT * FROM dish WHERE restaurant_id = ${id} AND dish_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if(err) throw err; 
      connection.query(sql_dishes, (err_d, result_d) => {
        if(err_d) throw err_d; 
        res.render('twoRestaurant', {result, result_d});
      })
    })
  }


  // abre el formulario de edición de un restaurante 
  // localhost:3000/restaurant/editRestaurant/id 
  showEditRestaurant = (req, res) => {
    let id = req.params.id; 
    let sql = `SELECT * FROM restaurant WHERE restaurant_id = ${id} AND restaurant_isdeleted = 0`;
    connection.query(sql, (err, result) => {
      if(err) throw err; 
      res.render('editFormRestaurant', {result});
    })
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
        res.redirect(`/restaurant/twoRestaurant/${id}`);
      })
    }

  // abre el formulario del login de usuario
  // localhost:3003/login/
  viewLogin = (req, res) => {
    res.render('formLogin');
  }

  login = (req, res) => {
    // el req.body me trae los datos escritos del formulario
    const {email, password} = req.body;
    // ver si este artista está en bd 

    if (email === "admin@admin" && password === "admin") {
      res.redirect('/hidden/vistaOculta');
    }

    let sql = `SELECT * FROM restaurant WHERE email = "${email}"`;
    connection.query(sql, (err, result) => {
      if(err) throw err; 
      console.log(result);
      if (result.length == 1){
        let hash = result[0].password; // contraseña incriptada 
        // comparamos contraseñas incriptadas y me devuelve como resultado: true o false
        bcrypt.compare(password, hash, (err, resultCompare) => {
          if (err) throw err;
          if (resultCompare /*== true, es redundante*/){
            res.redirect(`/restaurant/twoRestaurant/${result[0].restaurant_id}`);
          } else{
            res.render("formLogin", {message: "password incorrecta"});
          }
        }) 
      } else{
        return res.render("formLogin", {message: "email no existe"});
      }
    })
  }

  //borrado permanente de todos los platos del restaurante 
  deleteRestaurant = (req, res) => {
    let id = req.params.id; 
    let sql = `DELETE FROM restaurant WHERE restaurant_id = ${id}`; 
    connection.query(sql, (err, result) => {
      if(err) throw err;
      res.redirect(`/#section2`);
    })
  }

  // borrado lógico de todos los platos del restaurante
  delLogicRestaurant = (req, res) => {
    let id = req.params.id; 
    let sql = `UPDATE restaurant 
                    LEFT JOIN dish ON restaurant.restaurant_id = dish.restaurant_id SET restaurant.restaurant_isdeleted = 1, dish.dish_isdeleted = 1 WHERE restaurant.restaurant_id = ${id}`;
    connection.query(sql, (err, result) => {
      if(err) throw err; 
      res.redirect('/#section2');
    })
  }

}

module.exports = new RestaurantControllers;