const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const loadLogin = async(req,resp) => {
    try{
        resp.render('login');
    }
    catch(error) {
        console.log(error.message)
    }
}
const verifyLogin = async(req,resp) =>{
    try {
        const email = req.body.email
        const password = req.body.password

        const userData = await User.findOne({email:email});
        if(userData) {
            const passwordMatch = await bcrypt.compare(password,userData.password);
            
            if(passwordMatch) {
                req.session.user_id = userData._id;
                req.session.is_admin = userData.is_admin;
                if(userData.is_admin) {

                    resp.redirect('/dashboard');
                }
                else {
                    resp.redirect('/profile');
                }
            }
            else {
                resp.render('login',{message:'Email and Password is incorrect'})
            }
        }
        else {
            resp.render('login',{message:'Email and Password is incorrect',userLogin:1})
        }
    }
    catch(error) {
        console.log(error.message)
    }
}

const profile = async(req,resp) => {
    try{
        resp.send(('This is profile'))
    }
    catch(error) {
        console.log(error.message);
    }
}

const logout = async(req,resp) => {
    try {
        req.session.destroy();
        resp.redirect('/login')
    }
    catch(error) {
        console.log(error.message)
    }
}

const register = async(req,resp) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        req.session.email= req.body.email
        req.session.password = req.body.password

        const register = new User({
            name:name,
            email:email,
            password:password,
            is_admin:0
        });
        const registerData = await register.save();
        
        if(registerData) {
            resp.redirect('/');
        }
        else{
            resp.render('register')
        }

    }
    catch(error) {
        console.log(error.message);
    }
}
const loadRegister = async(req,resp) => {
    try{
        resp.render('register');
    }
    catch(error) {
        console.log(error.message)
    }
}

module.exports = {
    loadLogin,
    verifyLogin,
    profile,
    logout,
    loadRegister,
    register
}