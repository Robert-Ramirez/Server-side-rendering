var mongoose = require("mongoose");

// SCHEMA SETUP FOR DATABASE INPUT
var tasklistSchema = new mongoose.Schema({
   name: String,
   description: String,
   comments: 
       [
          {
             type: mongoose.Schema.Types.ObjectId,
             ref: "Comment"
          }
       ]
    });

module.exports = mongoose.model("tasklists", tasklistSchema);


// tasklists.create(
//      {
//          name: "Study", 
//          description: "Learn programming!"
         
//      },
//      function(err, campground){
//       if(err){
//           console.log(err);
//       } else {
//           console.log("NEWLY CREATED CAMPGROUND: ");
//           console.log(campground);
//       }
//     });
