// Adding Imports and Initializing the Environment
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Defining the public Folder access as
// public which can be accessed from the webbrowser
// [Let's say just a CSS file]
app.use(express.static('public'));

// Set the View engine for rendering Embedded JavaScript ".ejs"
app.set('view engine', 'ejs');

// Home Route
app.get("/", (req, res) => {
  res.render("home");
});
// Parameterized route
app.get("/favourite/:urlThing", (req, res) => {
  var thing = req.params.urlThing;
  res.render("favourite", {thingVar: thing});
});
// Passing Data from JSON Object Var route
app.get("/posts", (req, res) => {
  var posts = [
    {title: "Post 1", author: "Tom"},
    {title: "Post 2", author: "Jerry"},
    {title: "Post 3", author: "Spike"}
  ];
  res.render("posts", {posts: posts});
});


app.listen(port, () => {
  console.log('Application started at => http://localhost:'+port);
});