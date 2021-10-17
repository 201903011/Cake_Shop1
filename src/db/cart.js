var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    
    user_name : {
        type: String,
        required : true
    },
    user_email : {
        type: String,
        required : true
    } ,
    link: {
        type: String,
        required : true
    },
    name: {
        type: String,
        required : true
    },
    price : {
        type: Number ,
        required : false
    },
    quantity : {
        type: String,
        required : true
    },
    
});


const Cart  =  mongoose.model('cart', userSchema);

console.log(Cart,userSchema.obj) ;

module.exports = Cart ; 