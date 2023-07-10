const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

const app = express();

//db
const db=require('./database/keys').MongoURI

//connect to mongo
mongoose.connect(db,{useNewUrlParser:true})
.then(()=>console.log("mongo is working"))
.catch(err=>console.log(err))

app.use(bodyParser.urlencoded({ extended: true }));

//ejs
app.set("view engine","ejs");

//routes
app.use('',require('./routes/routes'))


app.listen(5000,console.log('working'))