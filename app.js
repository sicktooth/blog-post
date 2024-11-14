require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const {connectDB} = require('./config/blog_post')
const {rootRoute,aboutRoute,contactRoute, userRoute, userComposeRoute, userPostRoute} = require('./routes/get');
const { postUserName, addNewPost } = require('./routes/post');

connectDB();

app.get("/", rootRoute);

app.get("/about", aboutRoute)

app.get("/contact", contactRoute)

app.post('/', postUserName)

app.get('/:userName', userRoute)

app.get("/:userName/compose", userComposeRoute)

app.post("/compose", addNewPost)

app.get("/:userName/posts/:postId", userPostRoute)

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});
// Writing code is one thing but writing clean code is another