const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "Please enter user email"],
            unique: [true, "unique email address"]
        },

        password: {
            type: String,
            required: [true, "Please enter user password"],
        },
    }

);

const User = mongoose.model("User", UserSchema);

module.exports = User;