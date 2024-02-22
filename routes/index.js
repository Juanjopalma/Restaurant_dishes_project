var express = require('express');
var router = express.Router();
const indexControllers = require('../controllers/indexControllers');
const uploadImage = require('../middlewares/multer');

// enseña la página con todos los restaurantes
// localhost:3003/restaurant
router.get('/', indexControllers.showAllRestaurant); 


module.exports = router;
