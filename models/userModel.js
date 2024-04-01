const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        typeof: String,
        required: [true, "Name is required"]
    },
    email:{
        typeof: String,
        required: [true, "Email is required"]
    },
    password:{
        typeof: String,
        required: [true, "Password is required"]
    }
})

const userModel = mongoose.model("users", userSchema);

module.exports = userModel
