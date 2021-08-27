const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn}=require('../lib/auth');
//insertamos los datos
router.get('/add',isLoggedIn,(req,res)=>{
  res.render('links/add');
});

router.post('/add',isLoggedIn,async (req,res)=>{
  const{title,description, hora_inicio, lunes, martes, miercoles, jueves, viernes,
    horai_nicio2, lunes2, martes2, miercoles2, jueves2, viernes2,
    horai_nicio3, lunes3, martes3, miercoles3, jueves3, viernes3,
    horai_nicio4, lunes4, martes4, miercoles4, jueves4, viernes4,
    horai_nicio5, lunes5, martes5, miercoles5, jueves5, viernes5}=req.body;
  const newLink={
    title,
    description,
    hora_inicio,
    lunes, 
    martes, 
    miercoles, 
    jueves, 
    viernes,
    horai_nicio2, lunes2, martes2, miercoles2, jueves2, viernes2,
    horai_nicio3, lunes3, martes3, miercoles3, jueves3, viernes3,
    horai_nicio4, lunes4, martes4, miercoles4, jueves4, viernes4,
    horai_nicio5, lunes5, martes5, miercoles5, jueves5, viernes5,
    user_id:req.user.id 
  };
  await pool.query('INSERT INTO links set?',[newLink]);
  req.flash('success', 'Horario registrado exitosamente');
  res.redirect('/links');
});

router.get('/',isLoggedIn,async(req,res)=>{
  const links = await pool.query('SELECT * FROM links WHERE user_id =?',[req.user.id]);
  console.log(links);
  res.render('links/list',{links});
});
//eliminamos los datos 
router.get('/delete/:id',isLoggedIn, async(req, res)=>{
  const{id}=req.params;
  await pool.query('DELETE FROM links WHERE ID=?',[id]);
  req.flash('success', 'Horario eliminado exitosamente');
  res.redirect('/links');
});

router.get('/edit/:id',isLoggedIn, async(req, res)=>{
  const {id}= req.params;
  const links = await pool.query('SELECT * FROM links WHERE id=?',[id])
  res.render('links/edit',{links:links[0]});
});

router.post('/edit/:id',isLoggedIn,async (req, res)=>{
  const{id}=req.params;
  const {title, description, hora_inicio, lunes, martes, miercoles, jueves, viernes,
    horai_nicio2, lunes2, martes2, miercoles2, jueves2, viernes2,
    horai_nicio3, lunes3, martes3, miercoles3, jueves3, viernes3,
    horai_nicio4, lunes4, martes4, miercoles4, jueves4, viernes4,
    horai_nicio5, lunes5, martes5, miercoles5, jueves5, viernes5}= req.body;
  const newLink={
    title,
    description,
    lunes, 
    martes, 
    miercoles, 
    jueves, 
    viernes,
    horai_nicio2, lunes2, martes2, miercoles2, jueves2, viernes2,
    horai_nicio3, lunes3, martes3, miercoles3, jueves3, viernes3,
    horai_nicio4, lunes4, martes4, miercoles4, jueves4, viernes4,
    horai_nicio5, lunes5, martes5, miercoles5, jueves5, viernes5,
    hora_inicio
  };

  //editamos los datos 
  await pool.query('UPDATE links set ? WHERE id=?',[newLink, id]);
  req.flash('success', 'Horario editado exitosamente');
  res.redirect('/links');
});




router.get('auth/contactos',isLoggedIn,(req,res)=>{
  res.render('auth/contactos');
});

router.post('auth/contactos',async (req,res)=>{
  const{user, email, message}=req.body;
  const newMensaje={
   user,email,message
  };
  await pool.query('INSERT INTO preguntas set?',[newMensaje]);
  req.flash('success', 'Se envió con exito el mensaje');
  res.redirect('/');
});

module.exports= router;
