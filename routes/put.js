const {updateById} = require("../controllers/put_function")

const updatePost = (req, res)=> {
    let user = req.body.submit,
        postId = req.body.user,
        inputTitle = req.body.postTitle, 
    inputContent = req.body.postBody;
    
    updateById(postId, res, user, inputTitle, inputContent);
}
module.exports = {
    updatePost
}