const mongoose = require('mongoose');
const {Schema} = mongoose;

const connectDB = ()=> mongoose.connect('mongodb://localhost:27017/blogPostDB');
const postSchema = new Schema({
    title: String,
    content: String
  })
  
  const blogPostSchema = new Schema({
    userName: String,
    blog: [postSchema]
  })
const UserPost = mongoose.model('UserPost', blogPostSchema)


module.exports = {
    UserPost,
    connectDB
}