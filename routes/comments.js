var express = require("express");
var router  = express.Router({mergeParams: true});
var tasklists = require("../models/tasklists");
var Comment = require("../models/comments");
var middleware = require("../middleware");

//Comments New
router.get("/new",middleware.isLoggedIn, function(req, res){
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
               req.flash("error", "Something went wrong");
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
               req.flash("success", "Successfully added comment");
               res.redirect('/tasklists/' + tasklists._id);
           }
        });
       }
   });
});

// COMMENT EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
   Comment.findById(req.params.comment_id, function(err, foundComment){
      if(err){
          res.redirect("back");
      } else {
        res.render("comments/edit", {tasklists_id: req.params.id, comment: foundComment});
      }
   });
});

// COMMENT UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
      if(err){
          res.redirect("back");
      } else {
          res.redirect("/tasklists/" + req.params.id );
      }
   });
});

// COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    //findByIdAndRemove
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err){
           res.redirect("back");
       } else {
           req.flash("success", "Comment deleted");
           res.redirect("/tasklists/" + req.params.id);
       }
    });
});

module.exports = router;