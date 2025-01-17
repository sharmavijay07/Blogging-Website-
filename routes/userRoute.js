const express = require("express");
const user_route = express();
const bodyParser = require('body-parser');
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));
const session = require('express-session');
const config = require('../config/config');
user_route.use(session({
    secret:config.sessionSecret,
    resave:true,
    saveUninitialized:true
}));

user_route.set('view engine','ejs');
user_route.set('views','./views');

const multer = require('multer');
const path = require('path');
const userController = require('../controllers/userController')

const adminLoginAuth = require('../middlewares/adminLoginAuth');

user_route.use(express.static('public'));
user_route.get('/login',adminLoginAuth.isLogout,userController.loadLogin);                         
user_route.post('/login',userController.verifyLogin);   

user_route.get('/register',adminLoginAuth.isLogout,userController.loadRegister)
user_route.post('/register',adminLoginAuth.isLogout,userController.register);       

user_route.get('/logout',adminLoginAuth.isLogin,userController.logout); 

user_route.get('/profile',userController.profile);

module.exports = user_route;