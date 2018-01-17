var express = require("express");
var router  = express.Router({mergeParams: true});
var Tasklists = require("../models/tasklists");
var Comment = require("../models/comments");

//Comments New
router.get("/new", isLoggedIn, function(req, res){
    // find tasklists by id
    Tasklists.findById(req.params.id, function(err, alltasklists){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {tasklists: alltasklists});
        }
    })
});

//Comments Create
router.post("/",isLoggedIn,function(req, res){
   //lookup campground using ID
   Tasklists.findById(req.params.id, function(err, alltasklists){
       if(err){
           console.log(err);
           res.redirect("/tasklists");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               //add username and id to comment
               comment.author.id = req.user._id;
               comment.author.username = req.user.username;
               //save comment
               comment.save();
               alltasklists.comments.push(comment);
               alltasklists.save();
               console.log(comment);
               res.redirect('/tasklists/' + alltasklists._id);
           }
        });
       }
   });
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
