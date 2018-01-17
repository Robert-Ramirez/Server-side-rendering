var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    Tasklists   = require("./models/tasklists"),
    Comment     = require("./models/comments"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");
    
mongoose.Promise = global.Promise;

var url = process.env.DATABASEURL || "mongodb://localhost/todo";

mongoose.connect(url,{useMongoClient: true}); 
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//pass to every single template
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  next();
});

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
app.post("/tasklists", isLoggedIn, function(req, res){
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
app.get("/tasklists/new", isLoggedIn, function(req, res){
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

app.get("/tasklists/:id/comments/new", isLoggedIn, function(req, res){
    // find tasklists by id
    Tasklists.findById(req.params.id, function(err, alltasklists){
        if(err){
            console.log(err);
        } else {
             res.render("comments/new", {tasklists: alltasklists});
        }
    })
});

app.post("/tasklists/:id/comments", isLoggedIn, function(req, res){
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

//  ===========
// AUTH ROUTES
//  ===========

// show register form
app.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic

app.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
          res.redirect("/tasklists"); 
        });
    });
});

// show login form
app.get("/login", function(req, res){
  res.render("login"); 
});

// handling login logic
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/tasklists",
        failureRedirect: "/login"
    }), function(req, res){
});

// logic route
app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/tasklists");
});

function isLoggedIn(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

    //RUN THE SERVER
    app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});

