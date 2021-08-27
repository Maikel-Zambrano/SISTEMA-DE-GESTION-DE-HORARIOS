///ruta principal de la pagina para mostrar el inicio de la aplicacion 

const express = require('express');
const router = express.Router();
router.get('/',(req, res)=>{
    res.render('index');
});
router.get('/nosotros',(req, res)=>{
    res.render('auth/nosotros');
});
router.get('/contactos',(req, res)=>{
    res.render('auth/contactos');
});
module.exports = router;

