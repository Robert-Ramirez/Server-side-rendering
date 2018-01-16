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

    
app.get("/", function(req, res){
    res.render("home");
});

app.get("/tasklist", function(req, res){
    res.render("tasklist");
});

app.get("/tasklist/new", function(req, res){
   res.render("new"); 
});   

    app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});

