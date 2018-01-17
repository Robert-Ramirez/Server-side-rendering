var express = require("express");
var router  = express.Router({mergeParams: true});
var tasklists = require("../models/tasklists");
var Comment = require("../models/comments");
var middleware = require("../middleware");

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    // find tasklists by id
    console.log(req.params.id);
    tasklists.findById(req.params.id, function(err, tasklists){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {tasklists: tasklists});
        }
    })
});

//Comments Create
router.post("/",middleware.isLoggedIn,function(req, res){
   //lookup tasklists using ID
   tasklists.findById(req.params.id, function(err, tasklists){
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
               tasklists.comments.push(comment);
               tasklists.save();
               console.log(comment);
               req.flash('success', 'Created a comment!');
               res.redirect('/tasklists/' + tasklists._id);
           }
        });
       }
   });
});

router.get("/:commentId/edit", middleware.isLoggedIn, function(req, res){
    // find tasklists by id
    Comment.findById(req.params.commentId, function(err, comment){
        if(err){
            console.log(err);
        } else {
             res.render("comments/edit", {tasklists_id: req.params.id, comment: comment});
        }
    })
});

router.put("/:commentId", function(req, res){
   Comment.findByIdAndUpdate(req.params.commentId, req.body.comment, function(err, comment){
       if(err){
           res.render("edit");
       } else {
           res.redirect("/tasklists/" + req.params.id);
       }
   }); 
});

router.delete("/:commentId",middleware.checkUserComment, function(req, res){
    Comment.findByIdAndRemove(req.params.commentId, function(err){
        if(err){
            console.log("PROBLEM!");
        } else {
            res.redirect("/tasklists/" + req.params.id);
        }
    })
});

module.exports = router;