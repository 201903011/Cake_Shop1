var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    
    user_name : {
        type: String,
        required : true,
        unique : true
    },
    user_email : {
        type: String,
        required : true,
        unique : true
    } ,
    user_password: {
        type: String,
        required : true
    },
    user_address: {
        type: String,
        required : true
    },
    user_image : {
        type: Object,
        required : false
    },
    total_orders : {
        type: Number,
        required : true
    },
    
});


const User  =  mongoose.model(' ', userSchema);

console.log(User,userSchema.obj) ;

module.exports = User ; 