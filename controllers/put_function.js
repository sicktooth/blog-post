const { UserPost } = require("../config/database")

const updateById = async (postId, res, user, inputTitle, inputContent) => {
    try {
        await UserPost.updateOne(
            {userName: user, "blog._id": postId},
            {$set: {"blog.$.title" : inputTitle,"blog.$.content" : inputContent}}
        );
        res.redirect('/'+ user + '/posts/' + postId);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    updateById
}