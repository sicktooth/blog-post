const {contactContent,aboutContent} = require("../model/default_posts")
const {getPosts, getOneUserPost} = require('../controllers/get_functions')

const rootRoute = (req,res)=> res.render('form');
const aboutRoute = (req,res)=>  res.render('about',{aboutPara: aboutContent});
const contactRoute = (req,res)=> res.render('contact',{contactPara: contactContent});
const userRoute = (req, res)=> {
    let user = req.params.userName;
    getPosts(user, res)
}
const userComposeRoute = (req, res)=>{
    let user = req.params.userName;
    res.render('compose',{userName: user, postId: null, actionRoute: '/compose', editTitle: "", editBody: '',header: "Compose", footer: "Publish"})
}
const userPostRoute = (req, res)=> {
    let user = req.params.userName;
    let postId = req.params.postId; 
    getOneUserPost(postId,user,res,'post');
}

const postEditRoute = (req, res) => {
    let user = req.params.userName;
    let postID = req.params.postId;
    getOneUserPost(postID,user,res,'compose', "/update");
}

module.exports = {
    rootRoute,
    aboutRoute,
    contactRoute,
    userRoute,
    userComposeRoute,
    userPostRoute,
    postEditRoute
}