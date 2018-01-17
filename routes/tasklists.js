var express = require("express");
var router  = express.Router();
var tasklists = require("../models/tasklists");
var middleware = require("../middleware");
var request = require("request");

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
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newtasklists = {name: name, description: desc, author:author}
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

router.get("/:id/edit", middleware.checkUsertasklists, function(req, res){
    console.log("IN EDIT!");
    //find the tasklists with provided ID
    tasklists.findById(req.params.id, function(err, foundtasklists){
        if(err){
            console.log(err);
        } else {
            //render show template with that tasklists
            res.render("tasklists/edit", {tasklists: foundtasklists});
        }
    });
});

router.put("/:id", function(req, res){
    var newData = {name: req.body.name, description: req.body.desc};
    tasklists.findByIdAndUpdate(req.params.id, {$set: newData}, function(err, tasklists){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/tasklists/" + tasklists._id);
        }
    });
});


//middleware
// function isLoggedIn(req, res, next){
//     if(req.isAuthenticated()){
//         return next();
//     }
//     req.flash("error", "You must be signed in to do that!");
//     res.redirect("/login");
// }

module.exports = router;
