const { UserPost } = require("../config/database")

const deleteById = async (user, postId, res) => {
    try {
        await UserPost.findOneAndUpdate({userName: user}, {$pull: {blog: {_id: postId}}})
        res.redirect('/'+ user);
    } catch (error) {
        console,log(error)
    }
}

module.exports = {
    deleteById
}