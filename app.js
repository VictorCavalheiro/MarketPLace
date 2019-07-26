var express       = require("express");
var bodyParser    = require("body-parser");
var mongoose      = require("mongoose");
//login autentication frameworks
var passport      = require("passport");
var LocalStrategy = require("passport-local");
//getting the BD models
var User          = require("./models/user"),
     Ad            = require("./models/ad");


var app           =    express();

var flash         =  require("connect-flash");

//import the arq with all  middleware
var middleware = require("./middleware/index.js");

//setting the app
app.use(bodyParser.urlencoded({extended : true}));

//setting the files that are in the public folder on express 
app.use(express.static(__dirname+"/public"));

app.set("view engine", "ejs");

//setting database connections 
mongoose.connect("mongodb://localhost:27017/E-commerce", { useNewUrlParser: true });


// set this method to run locally , by:teka
/*app.listen(3001, 'localhost', function() {
    console.log("Running in localhost:3001");
});*/

// set this method to run in AWS env 
app.listen(process.env.PORT,process.env.IP,function(){
    console.log("E-commerce v1 running AWS");
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

//ADD FLASH 
app.use(flash());

//putting a  correntUser variable in all views 
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
     res.locals.error= req.flash("error")
    res.locals.success= req.flash("success")
    next();
});

// Setting Passport - end


//show home page       
app.get("/",function(req, res){
    Ad.find({},function(erro, allAds){
               if(erro){
                   console.log(erro);
               }else{
                   console.log(allAds)
                    res.render("home",{ads :allAds});
               }
               
           });
});

/*=================================
        Register Router - Inicio
  ==================================      
*/
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
            req.flash("error", "Existing use, please change!");
            res.redirect("/register");
        }else{
             req.flash("success", "Your registration was successful!");
            res.redirect("/login");
        }
    });
});
/*=================================
        Register Router - Fim
  ==================================      
*/

/*=================================
        Login Router - Inicio
  ==================================      
*/
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
    req.flash("success", "Logged you out!");
    res.redirect("/login");
});


app.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/login");
});

/*=================================
        Login Router - Fim
  ==================================      
*/

/*=================================
       Ad Router - Inicio
  ==================================      
*/

app.get("/home/new",middleware.isLoggedIn,function(req, res) {
       res.render("ads/new");
       
});

app.post("/home/new",middleware.isLoggedIn, function(req, res){
     var author = {
        id: req.user._id,
        username: req.user.username
     }
     
     var newAd = {
            title: req.body.title,
            price: req.body.price,
            image: req.body.image,
            description: req.body.description,
            author:author
        };
        //insert a new Ad, if it works redirect the page
     Ad.create(newAd, function(erro, newlyCreated){
                if(erro){
                    console.log(erro);
                }else{
                     res.redirect("/");
                }
     });
   
});
/*=================================
        Ad Router - Inicio
  ==================================      
*/