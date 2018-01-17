var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Tasklists   = require("./models/tasklists"),
    Comment     = require("./models/comments"),
    seedDB      = require("./seeds");
    
mongoose.Promise = global.Promise;

var url = process.env.DATABASEURL || "mongodb://localhost/todo";

mongoose.connect(url,{useMongoClient: true}); 
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

//ROUTERS 

//HOME PAGE - DISPLAYS HTML
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

//INDEX PAGE - SHOWS ALL TASKLIST
app.get("/tasklists", function(req, res){
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
app.post("/tasklists", function(req, res){
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

//NEW PAGE - DISPLAY HTML
app.get("/tasklists/new", function(req, res){
   res.render("tasklists/new"); 
});   

// SHOW PAGE - DISPLAYS DESCRIPTION FROM DATABASE IN NEW PAGE
app.get("/tasklists/:id", function(req, res){
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

// ====================
// COMMENTS ROUTES
// ====================

app.get("/tasklists/:id/comments/new", function(req, res){
    // find tasklists by id
    Tasklists.findById(req.params.id, function(err, alltasklists){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {tasklists: alltasklists});
        }
    })
});

app.post("/tasklists/:id/comments", function(req, res){
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


    //RUN THE SERVER
    app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});

