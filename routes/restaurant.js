var express = require('express');
var router = express.Router();
const restaurantControllers = require('../controllers/restaurantControllers');
const uploadImage = require('../middlewares/multer');


// abre la página con el formulario de registro del restaurante
// localhost:3003/restaurant/register
router.get('/register', restaurantControllers.restaurantRegister);


// recoja los datos del formulario 
// localhost:3000/restaurant/register
router.post('/register', uploadImage("restaurant"), restaurantControllers.createRestaurant);


// abre la página con info de un restaurante determinado con todos sus platos fácil
// localhost:3000/restaurant/oneRestaurant/1
router.get('/oneRestaurant/:id', restaurantControllers.viewOneRestaurant);

// abre la página con info de un restaurante determinado con todos sus platos y los botones con funcionalidades fácil
// localhost:3000/restaurant/oneRestaurant/1
router.get('/twoRestaurant/:id', restaurantControllers.viewTwoRestaurant);


// abre el formulario de edición de un restaurante 
// localhost:3000/restaurant/editRestaurant/id
router.get('/editRestaurant/:id', restaurantControllers.showEditRestaurant);


// recoge los datos del formulario para guardar en db
// localhost:3000/restaurant/editRestaurant/id
router.post('/editRestaurant/:id', uploadImage("restaurant"), restaurantControllers.editRestaurant);


// abre el formulario del login de usuario
// localhost:3003/login/
router.get('/login', restaurantControllers.viewLogin);

// recoge la info del formulario del login de usuario
router.post('/login', restaurantControllers.login);


//borrado permanente de todos los platos del restaurante 
router.get('/deleteRestaurant/:id', restaurantControllers.deleteRestaurant);


// borrado lógico de todos los platos del restaurante 
// Los url deben ser get en borrado lógico
router.get('/deleteRestaurantLogic/:id', restaurantControllers.delLogicRestaurant);


module.exports = router;
