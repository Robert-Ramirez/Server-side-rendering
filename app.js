var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    flash       = require("connect-flash"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Tasklists   = require("./models/tasklists"),
    Comment     = require("./models/comments"),
    User        = require("./models/user")


//requring routes
var commentRoutes    = require("./routes/comments"),
    tasklistsRoutes = require("./routes/tasklists"),
    indexRoutes      = require("./routes/index")

    
mongoose.Promise = global.Promise;

var url = process.env.DATABASEURL || "mongodb://localhost/todo";

mongoose.connect(url,{useMongoClient: true}); 
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.use(flash());

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
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

//routing
app.use("/", indexRoutes);
app.use("/tasklists", tasklistsRoutes);
app.use("/tasklists/:id/comments", commentRoutes);

//RUN THE SERVER
app.listen(process.env.PORT, process.env.IP, function(){
  console.log("The Server Has Started!");
});

