const {homePost} = require('../model/default_posts')
const {UserPost} = require('../config/database')

async function getPosts(user,res) {
    try {
      let results = await UserPost.findOne({userName: user});
      if (results) {
         res.render('home', {
          userName: user,
          firstPara: homePost,
          posts: results.blog
        });
      }
    } catch (error) {
      console.log(error);
    }
}

async function getOneUserPost(postId, user, res,ejsFile, route) {
    try {
      const foundPost = await UserPost.findOne({ userName: user });
  
      if (foundPost) {
        const blog = foundPost.blog.find(blog => blog._id.toString() === postId.toString());
        if (blog) {
          res.render(ejsFile, {
            title: blog.title,
            content: blog.content,
            userName: user,
            post: postId,
            postId: postId,
            editTitle: blog.title,
            editBody: blog.content,
            actionRoute: route,
            header: "Edit Post",
            footer: "Save",
            cancel: `/${user}/posts/${postId}`
          });
        } else {
          console.log("blog not found in the list of blog post.");
        }
      } else {
        console.log("Post not found.");
      }
    } catch (error) {
      console.error("Error retrieving post:", error);
    }
}

module.exports = {
    getPosts,
    getOneUserPost
}