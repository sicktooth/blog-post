const _ = require("lodash");
const {checkIfUserExists, addPost} = require('../controllers/post_functions')

const postUserName = (req,res)=>{
    let input = _.lowerCase(req.body.userName)
    let user_name = _.kebabCase(input);
    checkIfUserExists(user_name,res);
}

const addNewPost = (req, res)=> {
    let user = req.body.submit;
    let postTitle = req.body.postTitle;
    let postBody = req.body.postBody;

    const post = {
     title: postTitle,
     content: postBody
    }
    addPost(user, post, res);
}

module.exports = {
    postUserName,
    addNewPost
}