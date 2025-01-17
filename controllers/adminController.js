const blogsetting = require('../models/blogsettingModel');
const User = require('../models/userModel');
const Post = require('../models/postModel');
const bcrypt = require('bcrypt');
const securePassword = async(password) => {
    try {
        const passwordHash = bcrypt.hash(password,10);
        return passwordHash;
    }
    catch(error) {
        console.log(error.message)
    }
}

const blogThree = async(req,resp) => {
    try {
        let Blogsetting = await blogsetting.find({});
        if(Blogsetting.length>0) {
            resp.redirect('/login');
        }
        else{
            resp.render('blogSetup');
        }
    }
    catch(error) {
        console.log(error.message);
    }
}
const blogSetupSave = async (req,resp) => {
    try {
        const blog_title = req.body.blog_title
        const blog_image = req.file.filename
        const description = req.body.description
        const email = req.body.email
        const name = req.body.name;
        const password = await securePassword(req.body.password);       

        const blogSetting = new blogsetting({
            blog_title:blog_title,
            blog_logo:blog_image,
            description:description
           
        })
        
        await blogSetting.save();

        const user = new User({
            name:name,
            email:email,
            password:password,
            is_admin:1
        });

        const userData = await user.save();
        if(userData) {
            resp.redirect('/login');
        }
        else{
            resp.render('blogSetup',{message:"Blog not setup properly!"});
        }
    }
    catch(error) {
        console.log(error.message);
    }
}

const dashboard = async(req,resp) => {
    try{
        resp.render('admin/dashboard')
    }
    catch(error) {
        console.log(error.message);
    }
}

const loadPostDashboard = async(req,resp) => {
    try {
        resp.render('admin/postDashboard');
    }
    catch(error){
        console.log(error.message)
    }
}

const addPost = async(req,resp) => {
    try {
        const post = new Post({
            title:req.body.title,
            content:req.body.content
        });
        const postData = await post.save();
        resp.render('admin/postDashboard',{message:'Post added Successfully'})
    }
    catch(error) {
        console.log(error.message)
    }
}

module.exports = {
    blogThree,
    blogSetupSave,
    dashboard,
    loadPostDashboard,
    addPost
}