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

router.post("/", isLoggedIn, function(req, res){
   //lookup tasklists using ID
   Tasklists.findById(req.params.id, function(err, tasklists){
       if(err){
           console.log(err);
           res.redirect("/tasklists");
       } else {
        Comment.create(req.body.comment, function(err, comment){
           if(err){
               console.log(err);
           } else {
               tasklists.comments.push(comment);
               tasklists.save();
               res.redirect('/tasklists/' + tasklists._id);
           }
        });
       }
   });
   //create new comment
   //connect new comment to tasklists
   //redirect tasklists show page
});

//middleware
function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
