# Demos

## Demo 1 - Hello World

* `mkdir WebAppTest`
* `cd WebAppTest`
* `npm init`
  - everything by default except the entrypoint which will be `app.js`
* `code .` to open VS Code on that folder
* Explore what `package.json` is. Mainly mention the entrypoint which is `main: app.js`
* Show how to open the terminal in VSCode (`View > Terminal`)
* To handle the webserver, we're going to install `express`
* In the terminal window, run the command `npm install express --save`.
* Notice that `package.json` now has a dependency section on the latest version of `express`
* Create the file `app.js`
* Type in/snippet/copy/paste the following content. Always make sure to explain what each lines are doing as you are typing them.

```javascript
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => res.send('Hello world'));
app.listen(port, () => console.log('Application started at => http://localhost:'+port));
```

* Open up the browser and navigate to http://localhost:3000 to view our hello world show up on screen.


## Demo 2 Modifying the App

We start with the code from the previous demo.
* In the terminal window, run the command `npm install ejs --save`.
* Create folders & files inside the projet directory as per thie below given List:
  * public
    * app.css
  * views
    * partials
      * footer.ejs
      * header.ejs
    * home.ejs
* Lets start with adding few imports into the file (The Comments explains all)

```javascript
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


app.listen(port, () => {
  console.log('Application started at => http://localhost:'+port);
});
```
* The files which we created previous with the extension .ejs is intended to contain/ embed JS into it.
* Now lets populate files inside the directories created previously.
* Add the below code to the header.ejs file
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>TechUnite WebApp</title>
  <link rel="stylesheet" href="../app.css">
</head>
<body>
  <h1> Welcome to the Day 2 of TECH UNITE Virtual Event</h1>
  <h2> WebApp using NodeJS</h2>
```
* Add the below code to the footer.ejs file
```html
    <p>
      Copyright
      <% const date = new Date(); %>
      <%= date.getFullYear() %>
    </p>
  </body>
</html>
```
* Add the below code to the home.ejs file
```html
<!-- include header template -->
<%- include('partials/header') -%>

<h1>Welcome to Home</h1>
<img src="https://pixabay.com/get/52e3d3404a55af14f1dc84609620367d1c3ed9e04e507441732a7fd49645cd_340.png" height="80%" alt="image">

<!-- include footer template -->
<%- include('partials/footer') -%>
```
* Now Lets add some basic Styling to the Home Page:
```css
body {
  color:purple;
  background-color: antiquewhite;
}
```
* Run the code again with F5/ `node app.js` and go to localhost:3000. To see the Home Page.


* Now lets add a new route (right below the home page route):
```JavaScript
// Parameterized route
app.get("/favourite/:urlThing", (req, res) => {
  var thing = req.params.urlThing;
  res.render("favourite", {thingVar: thing});
});
```
* Now Add a new file named as "favourite.ejs" in the views directory.
* Add the below code into the above created "favourite.ejs" file:
```html
<!-- include header template -->
<%- include('partials/header') -%>
<h3>Your Favourite thing is: <%= thingVar.toUpperCase() %></h3>

<% if(thingVar.toLowerCase() === "technology"){ %>
<p>Good Choice! technology is the Best!</p>
<% } else { %>
  <p>Hmm, Still okay with me, But... You should have said technology</p>
<% } %>

<!-- include footer template -->
<%- include('partials/footer') -%>
```
* Run the code again with F5/ `node app.js` and go to localhost:3000. To see the Home Page.


* Now lets add a new route (right below the Favourite page route):
```JavaScript
// Passing Data from JSON Object Var route
app.get("/posts", (req, res) => {
  var posts = [
    {title: "Post 1", author: "Tom"},
    {title: "Post 2", author: "Jerry"},
    {title: "Post 3", author: "Spike"}
  ];
  res.render("posts", {posts: posts});
});
```
* Now Add a new file named as "posts.ejs" in the views directory.
* Add the below code into the above created "posts.ejs" file:
```html
<!-- include header template -->
<%- include('partials/header') -%>

<h1>The Posts</h1>

<!-- Using Traditional For Loop -->
<% for(var i = 0; i< posts.length; i++) { %></posts.length>
  <li>
    <%= posts[i].title %> - <strong><%= posts[i].author %></strong>
  </li>
<% } %>

<!-- Using For Each Loop -->
<% posts.forEach((post) => { %>
  <li>
      <%= post.title %> - <strong><%= post.author %></strong>
    </li>  
<% }) %>

<!-- include footer template -->
<%- include('partials/footer') -%>
```
* Run the code again with F5/ `node app.js` and go to localhost:3000. To see the Home Page.

## Demo 3 - Pushing to Azure

### Moving our code to GitHub

* Create a Node `.gitignore` file from https://github.com/github/gitignore within our project
* Create a new repository on GitHub to host our project (any name) using https://github.com/new
* Follow instructions to add our repository to this project
* Ensure that all the code has been pushed to the repository

### Creating the Azure Resources

From the Azure Portal (https://portal.azure.com)

* Click on "Create a resource"
* Click WebApps in the list
* Create a new Resource Group named `WebAppTest`
* Select a Web App name (`WebAppTest` in the video)
* Publish mode is `Code`
* Runtime stack is Node 12 LTS
* Operating System is Linux
* Region is `East US`
* Linux Plan:
  * Create a new one named WebAppTest
  * Change size to F1 (under Dev/Test)
* Click on Review + Create
* Click on Create

While this is deploying, talk about the current Deployment window that is being seen. Go through the Overview, Inputs, and Template.

Deployment should take no more than 1-2 minutes. Once everything is deployed, click on the button "Go to resource".

Explore the App Service Overview page.
* URL where things are deployed.
* Current App Service Plan
* Application stats
* Configuration -> this is where you set environment variable for your deployed app only. If an app require specific configurations, they should be located there. Within Configuration, under the "General settings", you can change your tech stack, platform settings, etc.

This should give you all the necessary basic tools to manage your first cloud application.

Once we've gone over everything, click the URL on the overview page. This takes us to a default page.

Let's fix that.

### Deploying with GitHub Actions

* Go to our newly created repository.
* Click on the "Actions" tab
* Select "Deploy Node.js to Azure Web App" option by clicking "Set up this workflow"
* Ensure that `AZURE_WEBAPP_NAME` has the name of the AppService we chose earlier
* Ensure that `NODE_VERSION` is `12.x`
* Take note of `AZURE_WEBAPP_PUBLISH_PROFILE` in the comments of that file.
* Make sure to change the trigger code to the below one:
```yml
on:
  push:
    branches:
      - master
```
* And the next step is to comment our the test folder existance check, as in our project we don't have any test unit. So do comment (the lasst line in the below code, present in azure.yml file) the code, it should look loke this:
```yml
    - name: npm install, build, and test
      run: |
        # Build and test the project, then
        # deploy to Azure Web App.
        npm install
        npm run build --if-present
      # npm run test --if-present
```
* Go back to our resource in Azure and download the publishing profile by clicking "Get publish profile"
  * Open it in Code
* Right click on Settings > Open in new tab
  * Click on secrets
  * Click add a new secret
    * Name: `AZURE_WEBAPP_PUBLISH_PROFILE`
    * Value: Copy the whole content of the publishing profile we opened earlier
  * Click the button "Add secret"
* Click on "Start commit" then "Commit new file"
* Do make a new Push into the repository
* Visit the repo, and head over to the Actions tab. There we'll see the action got triggered due to the push we just did.
* Wait until the Action has finished executing (<1 minute)
* Refresh the default page of our application.

You should see "Express / Welcome to Express" message that is the default for newly created Express application.

To prove this works, let's change the title on the `index.html` page and publish that change again to GitHub.