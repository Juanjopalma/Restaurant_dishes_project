var express = require('express');
var router = express.Router();
const hiddenControllers = require('../controllers/hiddenControllers');
const uploadImage = require('../middlewares/multer');

// enseña la página con todos los restaurantes
// localhost:3003/hidden/vistaOculta
router.get('/vistaOculta', hiddenControllers.showAllRestaurantAndDishes); 

//borrado permanente de todos los platos del restaurante 
router.get('/deleteRestaurant/:id', hiddenControllers.deleteRestaurant);

// borrado lógico de todos los platos del restaurante 
// Los url deben ser get en borrado lógico
router.get('/deleteRestaurantLogic/:id', hiddenControllers.delLogicRestaurant);


// borrado total del plato
router.get('/deleteDish/:id/:restaurant_id', hiddenControllers.deleteDish);

// borrado lógico de un plato
router.get('/deleteLogicDish/:id/:restaurant_id', hiddenControllers.delLogicDish);


module.exports = router;