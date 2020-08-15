const fs = require('fs');
const path = require('path');
const validarUsuario = require('../validations/validarUsuario.js');
const db = require('../database/models');


//Traemos los productos de la DB
function obtenerProductos(){
    db.Producto.findAll()
    .then(function(listadoDeProductos){
        return listadoDeProductos.json()
    })
}


    //  <<--PRODUCTSCONTROLLER-->>   //
module.exports = {
    listarProductos: function(req, res){

        let productos = obtenerProductos();
        if(req.session.idUsuario != undefined){
            res.redirect('listadoDeProductos', {productos: productos, usuario : req.session.idUsuario});
        }else{
            res.render('listadoDeProductos', {productos: productos});
        }

        
    },
    formularioProductos: function(req, res){
        res.render('formularioProductos')
    },
    detail: function(req, res) {
        let producto;
        for(let i = 0; i < productos.length; i++){
            if(productos[i].id == req.params.idProducto){
                producto = productos[i];
            }
        }

        let usuario = validarUsuario(req, res);
        if(usuario){
            res.render('detalleDelProducto', {producto : producto, usuario : usuario, productos: productos})
        }else{
            res.render('detalleDelProducto', {producto : producto, productos: productos})
        }
        
        
    },
    agregarACarrito : function(req, res){
        let data = req.body;
        //ACA TIENE QUE SUMAR AL CARRITO DEL USUARIO
        res.send(req.body);
    },
    editarProducto : function(req, res){
        let producto;
        for(let i = 0; i < productos.length; i++){
            if(productos[i].id == req.params.idProducto){
                producto = productos[i];
            }
        }

        let usuario = validarUsuario(req, res);
        if(usuario){
            res.render('editarProducto', {producto: producto, usuario : usuario})
        }else{
            res.render('editarProducto', {producto: producto})
        }
    },
    actualizarProducto : function(req, res){
        
        for (let i = 0; i < productos.length; i++){
            if(req.params.idProducto == productos[i].id){
                let productoActualizado = {
                    id: productos[i].id,
                    nombreProducto: req.body.nombreProducto,
                    precio: req.body.precio,
                    stock: req.body.stock,
                    descuento: req.body.descuento,
                    descripcionProducto: req.body.descripcionProducto,
                    colores: req.body.colores,
                    sustentabilidad: req.body.sustentabilidad,
                    imagen1: (!req.files[0]) ? productos[i].imagen1 : req.files[0].filename,
                    imagen2: (!req.files[1]) ? productos[i].imagen2: req.files[1].filename,
                    imagen3: (!req.files[2]) ? productos[i].imagen3 : req.files[2].filename,
                }
                productos[i] = productoActualizado;
            }
        }
    },
    crearProducto: function(req, res){

        //productos, imagen_productos, producto_colores, productos_sustentabillidad, productos_categoria
        db.ImagenProducto.create({
            nombre: 'pirulo',
            id_producto: 1
        })
        .then(function(result){
           return res.send(result);
        })
        .catch(function(error){
            res.send(error)
        })

        db.Producto.create({
            nombre: req.body.nombre,
            precio: req.body.precio,
            stock: req.body.stock,
            descuento: req.body.descuento,
            descripcion: req.body.descripcion
        })
        .then(function(nuevoProducto){

            

            db.ProductoColor.create({
                id_producto: nuevoProducto.id,
                id_color: color
            })
            .then(function(result){
                console.log('color: ' + result);
            })

            db.ProductoSustentabilidad.create({
                id_producto: nuevoProducto.id,
                id_sustentabilidad: req.body.sustentabilidad[i]
            })
            .then(function(result){
                console.log('sust: ' + result);
            })

            db.ProductoCategoria.create({
                id_producto: nuevoProducto.id,
                id_categoria: req.body.categoria[i]
            })
            .then(function(result){
                console.log('categoria: ' + result);
            })

        }).then(function(producto){
            //res.redirect('/product/listadoDeProductos/');
            res.redirect('/')
        })
        .catch(function(error){
            res.send(error)
        })
        /*let nuevoProducto = {
            id: Number(productos.length + 1),
            ...req.body
        }
        productos.push(nuevoProducto);
        fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productos));

        let usuario = validarUsuario(req, res);
        if(usuario){
            res.render('listadoDeProductos', {usuario : usuario})
        }else{
            res.render('listadoDeProductos')
        }*/
    },
    borrarProducto : function(req, res){
        console.log(req.params.idProducto);
        productos.forEach(elemento => {
            if(elemento.id == req.params.idProducto) {
                productos.splice(productos.indexOf(elemento), 1)
                fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(productos));
        
        }})
        //PARA BORRAR LA IMAGEN AL BORRAR EL PRODUCTO
        //fs.unlinkSync(path.join(ruta de la imagen, nombre de la imagen));
        res.redirect('/product/listadoDeProductos');
    }
}