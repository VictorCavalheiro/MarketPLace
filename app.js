var express       = require("express");
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
//login autentication frameworks
var passport      = require("passport"),
    LocalStrategy = require("passport-local");
//getting the BD models
var User          = require("./models/user");

var app           =    express();
//setting the app
app.use(bodyParser.urlencoded({extended : true}));

//setting the files that are in the public folder on express 
app.use(express.static(__dirname+"/public"));

app.set("view engine", "ejs");

//setting database connections 
mongoose.connect("mongodb://localhost:27017/E-commerce", { useNewUrlParser: true });


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("E-commerce v1");
});

// Setting Passport - begin

app.use(require("express-session")({
    secret: "THE MOST SECRET TOP",
    resave: false,
    saveUninitialized: false
}));

//ADD PASSPORT TO  THE APP  
app.use(passport.initialize());
app.use(passport.session());

//SETTING THE PASSPORT AND YOUR STRATEGY
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//putting a  correntUser variable in all views 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

// Setting Passport - end

var ads =[
            {name: "Playstation 4 ", image:"https://images-americanas.b2w.io/produtos/01/00/item/133092/7/133092720_1GG.jpg",price : "2400",description:"blah blah blah"},
            {name: "Xbox one 1TB", image:"https://a-static.mlcdn.com.br/618x463/console-xbox-one-s-1tb-com-2-controles-microsoft/mixabc/55/cae62e8b52dd880493955d5bd8d6e246.jpg",price : "1800",description:"blah blah blah"},
            {name: "Xbox one 1TB", image:"https://a-static.mlcdn.com.br/618x463/console-xbox-one-s-1tb-com-2-controles-microsoft/mixabc/55/cae62e8b52dd880493955d5bd8d6e246.jpg",price : "1800",description:"blah blah blah"},
            {name: "Game boy SP", image:"https://img.bgxcdn.com/images/oaupload/banggood/images/DD/EB/0b01dc79-7722-47b9-b8bb-42b33475dca6.jpg",price : "500",description:"blah blah blah"},
            {name: "Playstation 4 ", image:"https://images-americanas.b2w.io/produtos/01/00/item/133092/7/133092720_1GG.jpg",price : "2400",description:"blah blah blah"},
            {name: "Xbox one 1TB", image:"https://a-static.mlcdn.com.br/618x463/console-xbox-one-s-1tb-com-2-controles-microsoft/mixabc/55/cae62e8b52dd880493955d5bd8d6e246.jpg",price : "1800",description:"blah blah blah"},
            {name: "Xbox one 1TB", image:"https://a-static.mlcdn.com.br/618x463/console-xbox-one-s-1tb-com-2-controles-microsoft/mixabc/55/cae62e8b52dd880493955d5bd8d6e246.jpg",price : "1800",description:"blah blah blah"},
            {name: "Game boy SP", image:"https://img.bgxcdn.com/images/oaupload/banggood/images/DD/EB/0b01dc79-7722-47b9-b8bb-42b33475dca6.jpg",price : "500",description:"blah blah blah"}
          ]

//show home page       
app.get("/",function(req, res){
        res.render("home",{ads : ads});
});

// show register form
app.get("/register", function(req, res){
        res.render("register");
});

//Sing up logic
app.post("/register", function(req, res){
    var newUser = new User({firstName : req.body.firstName, lastName : req.body.LastName, address1: req.body.address ,address2: req.body.address2,username: req.body.userName});
    //the register function is from "passport-local-mongoose" , that function was add when the user model was created
    User.register(newUser,req.body.password,function(erro, user){
        if(erro){
            console.log(erro);
            res.render("register");
        }else{
            res.render("login");
        }
    });
});

//LOGIN LOGIC
app.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/",
        failureRedirect: "/login"
    }), function(req, res){
});

// show login form
app.get("/login", function(req, res){
        res.render("login");
});

//logout logic
app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/login");
});