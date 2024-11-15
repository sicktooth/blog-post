const { deleteById } = require("../controllers/delete_function");

const deletePost = (req, res)=> {
    let user = req.body.user,
    postId = req.body.delete;
    
    deleteById(user, postId, res);
}

module.exports = {deletePost}