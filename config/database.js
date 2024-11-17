require('dotenv').config();
const mongoose = require('mongoose');
const {Schema} = mongoose;

const connectDB = ()=> mongoose.connect('mongodb+srv://sicktooth003:'+process.env.remoteDB_connect_password+'@cluster0.diwwq.mongodb.net/blogPostDB');
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