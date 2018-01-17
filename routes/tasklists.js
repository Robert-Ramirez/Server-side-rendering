var express = require("express");
var router  = express.Router();
var Tasklists = require("../models/tasklists");

//INDEX PAGE - SHOWS ALL TASKLIST
router.get("/", function(req, res){
    // RETRIEVE TASK FROM DATABASE
    //FUNCTION IS FOR ITERATING THROUGH ALL TASK IN DATABASE
    Tasklists.find({}, function(err, alltasklists){
      if(err){
          console.log(err);
      } else {
          //REREOUTE TO INDEX PAGE AFTER ITERATING THROUGH ALL TASK IN DATABASE
          res.render("tasklists/index",{tasklists:alltasklists});
      }
    });
});

//CREATE - ADD NEW USER INPUT TO DATABASE
router.post("/", isLoggedIn, function(req, res){
    // RETRIEVE DATA FROM USER INPUT IN NEW PAGE AND CREATE AN ARRAY TO PREPARE FOR DATABASE ENTRY
    var name = req.body.name;
    var desc = req.body.description;
    var newTasklist = {name: name, description: desc}
    // CREATES A NEW TASK LIST ENTRY AND SAVES TO THE DATABASE
    Tasklists.create(newTasklist, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //REREOUTES TO THE INDEX PAGE
            res.redirect("/tasklists");
        }
    });
});

//NEW PAGE - show form to create new tasklists
router.get("/new", isLoggedIn, function(req, res){
  res.render("tasklists/new"); 
}); 

// SHOW PAGE - DISPLAYS DESCRIPTION FROM DATABASE IN NEW PAGE
router.get("/:id", function(req, res){
    //FINDS THE TASK IN DATABASE WITH A PROVIDED ID
    Tasklists.findById(req.params.id).populate("comments").exec(function(err, foundTask){
        if(err){
            console.log(err);
        } else {
            //REROUTES BAKE TO SHOW PAGE AFTER ITERATING THROUGH THE DATABASE/ARRY FOR THE TASK USING ID
            res.render("tasklists/show", {tasklists: foundTask});
        }
    });
})

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;

