#Task Manager

* Description: Learn server-side rendering by creating a website that manages task

Steps Completed:
##Initial Setup
* Add Home Page
* Add Tasklists Page that lists all tasklists

Each Tasklist has:
   * Name
   * Description

##Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap

##Creating New Tasklist
* Setup new tasklist POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form

##Style the Tasklist's page
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

##Users + Tasklists
* Prevent an unauthenticated user from creating a tasklist
* Save username+id to newly created tasklist

##Setup Online Server
* Connect to online server
* Link: https://dashboard.heroku.com/apps/ancient-fjord-90562

#Setup Online Database
* Connect to online database
* Link: https://mlab.com/

##Upload to github
* Create online repository

## Pending
* Responsive CSS

##RESTFUL ROUTES (Additional information on routers)

name        url                             verb    desc.
===================================================================================================
INDEX       /tasklists                      GET   Display a list of all tasklists
NEW         /tasklists/new                  GET   Displays form to make a new tasklist
CREATE      /tasklists                      POST  Add new tasklist to DB
SHOW        /tasklists/:id                  GET   Shows info about one tasklist
NEW         tasklists/:id/comments/new      GET   Displays form to make a new comment
CREATE      tasklists/:id/comments          POST  Add new comment to DB