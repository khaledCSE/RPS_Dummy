var mongoose = require('mongoose')

var schema = mongoose.Schema;

var studentSchema = new schema({
    username:{
        type:String,
        required:true,
    },
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    dept:{
        type:String,
        required:true,
    },
    batch:{
        type:Number,
        required:true,
    }
    
})


module.exports = mongoose.model('students',studentSchema,'students');