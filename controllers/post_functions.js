const {UserPost} = require('../config/blog_post')

async function checkIfUserExists(user_name,res) {
    try {
      let results = await UserPost.findOne({userName: user_name});
      if (results) {
        // console.log(results);
        
        res.redirect('/'+ user_name)
      } else {
         UserPost.create({
          userName: user_name
        });
        res.redirect('/'+ user_name)
      
      }
    } catch (error) {
      console.log(error);
    }
 
}

async function addPost(user, post, res) {
    try {
      await UserPost.findOneAndUpdate({userName:user}, {$push: {blog: post}});
      res.redirect("/"+user)
      
    } catch (error) {
      console.log(error);
    }
}

module.exports = {
    checkIfUserExists,
    addPost
}