//object has all middleware functions
var Ad      = require("../models/ad"),
    User    = require("../models/user");
    
    
    
var middlewareObj = {
    
    isLoggedIn :function (req, res, next){
        if(req.isAuthenticated()){
            //if is logged,let call the netx function
            return next();
         }else{
             //add the message in flash 
             req.flash("error", "You need to be logged in to do that!")
            res.redirect("/login");
        }
    }
}

//export the object with express
module.exports = middlewareObj;