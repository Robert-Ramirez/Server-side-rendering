#Task Manager

##Initial Setup
* Add Home Page
* Add tasklists Page that lists all tasklists

Each tasklist has:
   * Name
   * Image

##Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

##Creating New tasklists
* Setup new tasklist POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

##Style the tasklists page
* Add a better header/title
* Make tasklists display in a grid

##Style the Navbar and Form
* Add a navbar to all templates
* Style the new tasklist form

##Add Mongoose
* Install and configure Mongoose
* Setup tasklist model
* Use tasklist model inside of our routes

##Show Page
* Review the RESTful routes we've seen so far
* Add description to our tasklist model
* Show db.collection.drop()
* Add a show route/template

##Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly!

##Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts

##Add the Comment model!
* Make our errors go away!
* Display comments on tasklist show page

##Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

##Style Show Page
* Add sidebar to show page
* Display comments nicely

##Finish Styling Show Page
* Add public directory
* Add custom stylesheet

##Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model 

##Auth Pt. 2 - Register
* Configure Passport
* Add register routes
* Add register template

##Auth Pt. 3 - Login
* Add login routes
* Add login template

##Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

##Auth Pt. 5 - Show/Hide Links
* Show/hide auth links in navbar 

##Refactor The Routes
* Use Express router to reoragnize all routes

##Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

##Users + tasklists
* Prevent an unauthenticated user from creating a tasklist
* Save username+id to newly created tasklist

#Upload on github
* git remote add origin https://github.com/Robert-Ramirez/taskmanager.git
* git push -u origin master

#Upload on heroku server
* https://dashboard.heroku.com/apps/ancient-fjord-90562

TODOS
* Add "back" redirect to login
* Add method-override
* BOOTSTRAP NAV COLLPASE JS
* Flash Messages
* Refactor container div to header
* Show/hide delete and update buttons
* style login/register forms
* Random Background Home Page
* Refactor middleware
* change styling in show template - comment delete/update
* UPATE/DELETE tasklist

* BOOTSTRAP NAV COLLPASE JS
* Flash Messages
* Refactor container div to header
* Show/hide delete and update buttons
* style login/register forms
* Random Background Home Page
* Refactor middleware
* change styling in show template - comment delete/update
* UPDATE/DELETE tasklist




RESTFUL ROUTES

name      url      verb    desc.
===============================================
INDEX   /dogs      GET   Display a list of all dogs
NEW     /dogs/new  GET   Displays form to make a new dog
CREATE  /dogs      POST  Add new dog to DB
SHOW    /dogs/:id  GET   Shows info about one dog

INDEX   /tasklists
NEW     /tasklists/new
CREATE  /tasklists
SHOW    /tasklists/:id

NEW     tasklists/:id/comments/new    GET
CREATE  tasklists/:id/comments      POST