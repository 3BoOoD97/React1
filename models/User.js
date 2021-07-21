const mngoose = require("mongoose")
const userSchema = new mngoose.Schema({
    email:{
    type: String,
    required: true
    },

    password: {
        type: String,
        required: true
    },

})

let User = mngoose.model('User', userSchema, 'users');

module.exports = User;