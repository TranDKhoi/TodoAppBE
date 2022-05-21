const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    task: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    ]
})

let User = mongoose.model("User", UserSchema)
module.exports = { User }