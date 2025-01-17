const BlogSetting = require("../models/blogsettingModel");
const isBlog = async(req,resp,next) => {
    try {
        const blogsetting = await BlogSetting.find({});
        if(blogsetting.length == 0 && req.originalUrl != "/blog-setup") {
            resp.redirect('/blog-setup');
        }
        else {
            next();
        }
    }
    catch(error) {

    }
}

module.exports = {
    isBlog
}