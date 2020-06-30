//  <<--REQUIRES OF ROUTES-->>   //
const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require(path.join(__dirname, '../controllers/productsController.js'));


router.get('/busqueda', productsController.busqueda);

router.get('/formularioProductos', productsController.formularioProductos);

router.get('/detail/:productId/', productsController.detail);


module.exports = router;