var mongoose = require('mongoose')

var schema = mongoose.Schema;

var courseSchema = new schema({
    course_id:{
        type:String,
        required:true,
    },
    course_name:{
        type:String,
        required:true,
    },
    dept:{
        type:String,
        required:true,
    },
    credit:{
        type:Number,
        required:true,
    }
    
})


module.exports = mongoose.model('courses',courseSchema,'courses');