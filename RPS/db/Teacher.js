var mongoose = require('mongoose')

var schema = mongoose.Schema;

var teacherSchema = new schema({
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
    designation:{
        type:String,
        required:true,
    }
    
})


module.exports = mongoose.model('teachers',teacherSchema,'teachers');