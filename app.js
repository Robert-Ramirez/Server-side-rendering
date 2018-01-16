var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Tasklists   = require("./models/tasklists"),
    seedDB      = require("./seeds")
    
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
app.get("/index", function(req, res){
    // RETRIEVE TASK FROM DATABASE
    //FUNCTION IS FOR ITERATING THROUGH ALL TASK IN DATABASE
    Tasklists.find({}, function(err, allTasklists){
      if(err){
          console.log(err);
      } else {
          //REREOUTE TO INDEX PAGE AFTER ITERATING THROUGH ALL TASK IN DATABASE
          res.render("index",{tasklists:allTasklists});
      }
    });
});

//CREATE - ADD NEW USER INPUT TO DATABASE
app.post("/index", function(req, res){
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
            res.redirect("/index");
        }
    });
});

//NEW PAGE - DISPLAY HTML
app.get("/index/new", function(req, res){
   res.render("new"); 
});   

// SHOW PAGE - DISPLAYS DESCRIPTION FROM DATABASE IN NEW PAGE
app.get("/index/:id", function(req, res){
    //FINDS THE TASK IN DATABASE WITH A PROVIDED ID
    Tasklists.findById(req.params.id).populate("comments").exec(function(err, foundTask){
        if(err){
            console.log(err);
        } else {
            //REROUTES BAKE TO SHOW PAGE AFTER ITERATING THROUGH THE DATABASE/ARRY FOR THE TASK USING ID
            res.render("show", {tasklists: foundTask});
        }
    });
})


    //RUN THE SERVER
    app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});

