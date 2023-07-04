const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String
    },
    lastName : {
        type : String
    },
    email : {
        type: String,
        unique : true
    },
    password : {
        type : String
    },
    token : {
        type : String
    }
});

userSchema.statics.getUsers = function(cb) {
    return this.find({}, {__v : 0, password : 0}, cb);
}

userSchema.statics.getUserById = function(_id, cb) {
    return this.findOne({_id}, {__v : 0, password : 0}, cb);
}

userSchema.statics.checkUserExist = function(data, cb) {
    return this.findOne(data, {__v : 0}, cb);
}

userSchema.methods.registerUser = function(cb) {
    return this.save(cb);
}

// userSchema.statics.updateBook = function(id, data, opt, cb) {
//     return this.findByIdAndUpdate(id, data, opt, cb);
// }

// userSchema.statics.deleteBook = function(id, cb) {
//     return this.findByIdAndDelete(id, cb);
// }

const User      = mongoose.model("User", userSchema);
module.exports  = User;