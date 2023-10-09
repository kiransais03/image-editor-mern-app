const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const usersSchema = new Schema ({
    email:{
        type:String,
        require:true,
    },
    password : {
        type:String,
        require:true
    },
    imgdata : {
        type:Buffer,
        require : true,
    }
})

module.exports = mongoose.model('users',usersSchema);

