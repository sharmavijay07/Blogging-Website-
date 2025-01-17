const Post = require('../models/postModel');



const loadBlog = async(req,resp) => {
    try {
        const posts = await Post.find({});
        resp.render('blog' ,{posts:posts,userLogin:1});
    }
    catch(error) {
        console.log(error.message);
    }
}

const loadPost = async(req,resp) => {
    try {
        const posts = await Post.findOne({"_id":req.params.id});
        // console.log(posts)
        resp.render('post',{posts:posts});
    }
    catch(error) {
        console.log(error.message)
    }
}

module.exports = {
    loadBlog,
    loadPost
}