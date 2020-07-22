//  <<--REQUIRES OF ROUTES-->>   //
const express = require('express');
const router = express.Router();
const path = require('path');
const productsController = require(path.join(__dirname, '../controllers/productsController.js'));
const multer = require('multer'); 

let storage = multer.diskStorage({
    destination:function(req, file, cb){
        cb(null, path.join(__dirname, '../../public/images/productos'));
    },
    filename: function(req, file, cb){
        cb(null, 'producto' + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({storage:storage});


router.get('/listadoDeProductos', productsController.listarProductos);
router.get('/formularioProductos', productsController.formularioProductos);
router.post('/formularioProductos', upload.any(), productsController.crearProducto);
router.get('/editarProducto/:idProducto', productsController.editarProducto);
router.put('/editarProducto/:idProducto', upload.any(), productsController.actualizarProducto);
router.get('/detail/:idProducto', productsController.detail);
router.post('/detail/:idProducto', productsController.agregarACarrito);
router.delete('/borrar/:idProducto', productsController.borrarProducto);

module.exports = router;