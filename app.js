var express  = require("express"),
    app      = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");
    
mongoose.Promise = global.Promise;

mongoose.connect(process.env.DATABASEURL,{useMongoClient: true}); 
// mongodb://rob:new3@ds255767.mlab.com:55767/todo23
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

var tasklist = [
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"},
        {name: "Salmon Creek", image: "https://farm9.staticflickr.com/8442/7962474612_bf2baf67c0.jpg"},
        {name: "Granite Hill", image: "https://farm1.staticflickr.com/60/215827008_6489cd30c3.jpg"},
        {name: "Mountain Goat's Rest", image: "https://farm7.staticflickr.com/6057/6234565071_4d20668bbd.jpg"}
];
    
app.get("/", function(req, res){
    res.render("home");
});

app.get("/tasklist", function(req, res){
    res.render("tasklist",{tasklist:tasklist});
});

app.post("/tasklist", function(req, res){
    // get data from form and add to tasklist array
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image}
    tasklist.push(newCampground);
    //redirect back to tasklist page
    res.redirect("/tasklist");
});

app.get("/tasklist/new", function(req, res){
   res.render("new.ejs"); 
});    

    
    app.listen(process.env.PORT, process.env.IP, function(){
   console.log("The Server Has Started!");
});

