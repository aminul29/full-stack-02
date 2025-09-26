const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "User First Name is required"],
        trim: true,
        maxlength: [100, "User first name cannot be more than 100 characters"]
    },
    lastName: {
        type: String,
        required: false,
        trim: true,
        maxlength: [100, "User last name cannot be more than 100 characters"]
    },
    email: {
        type: String,
        required: [true, "User Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (email){
                return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
            },
            message: () => "User email is not valid",
        }
    },
    password: {
        type: String,
        required: [true, "User Password is required"],
        minlength: [6, "User password must be at least 6 characters"],
        maxlength: [100, "User password cannot be more than 100 characters"],
        validate: {
            validator: function (password){
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
            },
            message: () => "User password must contain at least one letter and one number",
        }
    },
});

const User = model("User", userSchema);

module.exports = User;