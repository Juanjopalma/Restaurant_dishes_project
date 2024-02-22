const express = require('express');
const router = express.Router();
const multer = require('../middlewares/multer');
const dishControllers = require('../controllers/dishControllers');

// enseña la página con todas las obras de arte
// localhost:3003/dish
router.get('/', dishControllers.showAllDishes);


// abre formulario de creación de la obra de arte
// localhost:3003/dish/createDish
router.get('/createDish/:id', dishControllers.viewCreateDish);

// recoge los datos del plato y recupera del params el id del restaurante 
router.post('/createDish/:id', multer("dish"), dishControllers.createDish);


// borrado total del plato
router.get('/deleteDish/:id/:restaurant_id', dishControllers.totalDelete);


// borrado lógico de un plato
router.get('/deleteLogicDish/:id/:restaurant_id', dishControllers.logicDelete);


// abre el formulario de edición de un plato 
// localhost:3003/dish/editDish/id
router.get('/editDish/:id', dishControllers.showEditDish);

// recoge los datos del formulario para guardar en db
router.post('/editDish/:id', multer("dish"), dishControllers.editDish);



module.exports = router;

