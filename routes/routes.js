const express= require('express')
const route = express.Router()
const controller = require('../controller/controller')
const axios = require('axios');
const Userdb = require('../model/model');


route.get('/',(req,res)=>{
    axios.get('http://localhost:5000/api/users')
    .then(function(response){ res.render('home' , {users:response.data} )})
    .catch()
   
})

route.get('/add_user',(req,res)=>{
    res.render('add_user')
})

 


route.get("/delete/:id",(req,res)=>{
    let id = req.params.id;
    Userdb.findByIdAndRemove(id).then(res.redirect('/')).catch(err=>console.log(err))
})




route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
// route.put('/api/users/:id',controller.update);

route.put('/update_user/:id',(req,res)=>{
    let id = req.params.id;
    Userdb.findByIdAndUpdate(id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        contract:req.body.contract
    }).then(res.redirect('/')).catch(err=>console.log(err))
})

route.get('/update_user',(req,res)=>{
    axios.get('http://localhost:5000/api/users', { params : { id : req.query.id }})
         .then(function(userdata){
             res.render("update_user", { user : userdata.data})
         })
         .catch(err =>{
             res.send(err);
         })
 
 }
)



module.exports = route