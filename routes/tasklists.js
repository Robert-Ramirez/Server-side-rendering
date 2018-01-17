var express = require("express");
var router  = express.Router();
var tasklists = require("../models/tasklists");
var middleware = require("../middleware");


//INDEX - show all tasklists
router.get("/", function(req, res){
    // Get all tasklists from DB
    tasklists.find({}, function(err, alltasklists){
       if(err){
           console.log(err);
       } else {
          res.render("tasklists/index",{tasklists:alltasklists});
       }
    });
});

//CREATE - add new tasklists to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    // get data from form and add to tasklists array
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newtasklists = {name: name, image: image, description: desc, author:author}
    // Create a new tasklists and save to DB
    tasklists.create(newtasklists, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to tasklists page
            console.log(newlyCreated);
            res.redirect("/tasklists");
        }
    });
});

//NEW - show form to create new tasklists
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("tasklists/new"); 
});

// SHOW - shows more info about one tasklists
router.get("/:id", function(req, res){
    //find the tasklists with provided ID
    tasklists.findById(req.params.id).populate("comments").exec(function(err, foundtasklists){
        if(err){
            console.log(err);
        } else {
            console.log(foundtasklists)
            //render show template with that tasklists
            res.render("tasklists/show", {tasklists: foundtasklists});
        }
    });
});

// EDIT tasklists ROUTE
router.get("/:id/edit", middleware.checkTasklistsOwnership, function(req, res){
    tasklists.findById(req.params.id, function(err, foundtasklists){
        res.render("tasklists/edit", {tasklists: foundtasklists});
    });
});

// UPDATE tasklists ROUTE
router.put("/:id",middleware.checkTasklistsOwnership, function(req, res){
    // find and update the correct tasklists
    tasklists.findByIdAndUpdate(req.params.id, req.body.tasklists, function(err, updatedtasklists){
       if(err){
           res.redirect("/tasklists");
       } else {
           //redirect somewhere(show page)
           res.redirect("/tasklists/" + req.params.id);
       }
    });
});

// DESTROY tasklists ROUTE
router.delete("/:id",middleware.checkTasklistsOwnership, function(req, res){
   tasklists.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/tasklists");
      } else {
          res.redirect("/tasklists");
      }
   });
});


module.exports = router;

