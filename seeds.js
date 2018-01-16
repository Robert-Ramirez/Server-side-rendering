var mongoose = require("mongoose"),
    Tasklists = require("./models/tasklists"),
    Comment   = require("./models/comments");

var data = [
    {
        name: "Cloud's Rest", 
        description: "blah blah blah"
    },
    {
        name: "Desert Mesa", 
        description: "blah blah blah"
    },
    {
        name: "Canyon Floor", 
        description: "blah blah blah"
    }
]

function seedDB(){
   //Remove all Tasklistss
   Tasklists.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed task!");
         //add a few Tasklistss
        data.forEach(function(seed){
            Tasklists.create(seed, function(err, Tasklists){
                if(err){
                    console.log(err)
                } else {
                    console.log("added a Tasklists");
                    //create a comment
                    Comment.create(
                        {
                            text: "This place is great, but I wish there was internet",
                            author: "Homer"
                        }, function(err, comment){
                            if(err){
                                console.log(err);
                            } else {
                                Tasklists.comments.push(comment);
                                Tasklists.save();
                                console.log("Created new comment");
                            }
                        });
                }
            });
        });
    }); 
    //add a few comments
}

module.exports = seedDB;
