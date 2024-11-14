require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const homePost = " Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


mongoose.connect('mongodb://localhost:27017/blogPostDB');

const postSchema = new mongoose.Schema({
  title: String,
  content: String
})

const blogPostSchema = new mongoose.Schema({
  userName: String,
  blog: [postSchema]
})

const Post = mongoose.model('Post', postSchema)
const UserPost = mongoose.model('UserPost', blogPostSchema)

app.get("/", function(req, res) {
  res.render('form')
});

app.get("/about", function(req, res) {
  res.render('about',{
    aboutPara: aboutContent
  })
})

app.get("/contact", function(req, res) {
  res.render('contact',{
    contactPara: contactContent
  })
})

app.post('/', (req, res)=>{
  let input = _.lowerCase(req.body.userName)
  let user_name = _.kebabCase(input);
  async function checkForEmptyDB() {
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
  
   checkForEmptyDB();
}) 

app.get('/:userName', (req,res)=>{
  let user = req.params.userName;
  
  async function getPosts() {
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
  getPosts();
})

app.get("/:userName/compose", function(req, res){
  let user = req.params.userName;
  res.render('compose',{userName: user})
})

app.post("/compose", function(req, res){
  let user = req.body.submit;
  let postTitle = req.body.postTitle;
  let postBody = req.body.postBody;

  const post = {
   title: postTitle,
   content: postBody
  }
  async function updatePost() {
    try {
      await UserPost.findOneAndUpdate({userName:user}, {$push: {blog: post}});
      res.redirect("/"+user)
      
    } catch (error) {
      console.log(error);
    }
  }
  updatePost();
 
})

app.get("/:userName/posts/:postId", function(req, res){
  let user = req.params.userName;
  let post = req.params.postId;


  async function getPostFromNestedArray(postId) {
    try {
      const foundPost = await UserPost.findOne({ userName: user });
  
      if (foundPost) {
        const blog = foundPost.blog.find(blog => blog._id.toString() === postId.toString());
        if (blog) {
          console.log("Found post:", blog);
          res.render('post', {
            title: blog.title,
            content: blog.content
          });
        } else {
          console.log("post not found in the list of blog post.");
        }
      } else {
        console.log("Post not found.");
      }
    } catch (error) {
      console.error("Error retrieving post:", error);
    }
  }
  
  getPostFromNestedArray(post);
})

app.listen(PORT, function() {
  console.log("Server started on port 3000");
});
