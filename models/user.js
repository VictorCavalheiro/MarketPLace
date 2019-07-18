var mongoose = require("mongoose");
//add the passport-local for the bd strategy
var passPortLocalMongoose = require("passport-local-mongoose");
//setting the bd schema
var UserSchema = new mongoose.Schema({
        firstName    : String,
        lastName : String,
        address1 : String,
        address2 : String,
        username : String,
        password : String
});
//setting the passportLocal in the Schema for add news methods to schema
UserSchema.plugin(passPortLocalMongoose);
module.exports = mongoose.model("User", UserSchema);