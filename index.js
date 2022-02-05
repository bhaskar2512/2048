const express = require("express");
const expressLayouts=require('express-ejs-layouts');
const path = require('path');
const app = express();

//Assets
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Set Template Engine
app.use(expressLayouts);
app.set('views',path.join(__dirname,'public/views'));
app.set('view engine','ejs');

app.get('/',(req,res)=>{
    res.render('home');
});


app.listen('3000',()=>{
    console.log('Running on port 3000');
})