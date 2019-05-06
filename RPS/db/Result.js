var mongoose = require('mongoose')

var schema = mongoose.Schema;

var resultSchema = new schema({
    username:{
        type:String,
        required:true,
    },
    course_id:{
        type:String,
        required:true,
    },
    trimester_id:{
        type:String,
        required:true,
    },
    grade:{
        type:Number,
        required:true,
    }
    
})


module.exports = mongoose.model('results',resultSchema,'results');