var express  = require("express"),
    app      = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.Promise = global.Promise;

var url = process.env.DATABASEURL || "mongodb://localhost/todo";

mongoose.connect(url,{useMongoClient: true}); 
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

// SCHEMA SETUP
var tasklistSchema = new mongoose.Schema({
   name: String,
   description: String
});

var tasklists = mongoose.model("tasklists", tasklistSchema);

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
    
app.get("/", function(req, res){
    res.render("home");
});

// app.get("/index", function(req, res){
//     var tasklists = [
//         {name: "new", description: "hello"},
//         {name: "new2", description: "hello2"}
//         ]
//     res.render("index", {tasklists:tasklists});
// });

//INDEX - show all tasklist
app.get("/index", function(req, res){
    // Get all campgrounds from DB
    tasklists.find({}, function(err, allTasklists){
      if(err){
          console.log(err);
      } else {
          res.render("index",{tasklists:allTasklists});
      }
    });
});

//CREATE - add new campground to DB
app.post("/index", function(req, res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var desc = req.body.description;
    var newTasklist = {name: name, description: desc}
    // Create a new campground and save to DB
    tasklists.create(newTasklist, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to campgrounds page
            res.redirect("/index");
        }
    });
});

//NEW - show form to create new tasklist
app.get("/index/new", function(req, res){
   res.render("new.ejs"); 
});   

// SHOW - shows more info about one campground
app.get("/index/:id", function(req, res){
    //find the campground with provided ID
    tasklists.findById(req.params.id, function(err, foundTask){
        if(err){
            console.log(err);
        } else {
            //render show template with that campground
            res.render("show", {tasklists: foundTask});
        }
    });
})

    app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});

