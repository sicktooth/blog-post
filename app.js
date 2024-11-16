require('dotenv').config();
const express = require("express");
const ejs = require("ejs");
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');
const {connectDB} = require('./config/database')
const {rootRoute,aboutRoute,contactRoute, userRoute, userComposeRoute, userPostRoute, postEditRoute} = require('./routes/get');
const { postUserName, addNewPost } = require('./routes/post');
const { deletePost } = require('./routes/delete');
const { updatePost } = require('./routes/put');

connectDB();

app.get("/", rootRoute);

app.get("/about", aboutRoute)

app.get("/contact", contactRoute)

app.post('/', postUserName)

app.get('/:userName', userRoute)

app.get("/:userName/compose", userComposeRoute)

app.post("/compose", addNewPost)

app.get("/:userName/posts/:postId", userPostRoute)

app.get("/:userName/posts/:postId/update", postEditRoute)

app.post("/update", updatePost)

app.post('/delete', deletePost);

app.listen(PORT, function() {
  console.log("Server started on port " + PORT);
});
// Writing code is one thing but writing clean code is another