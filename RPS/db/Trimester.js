var mongoose = require('mongoose')

var schema = mongoose.Schema;

var trimesterSchema = new schema({
    trimester_id:{
        type:String,
        required:true,
    },
    trimester_name:{
        type:String,
        required:true,
    },
    
    year:{
        type:Number,
        required:true,
    }
    
})


module.exports = mongoose.model('trimesters',trimesterSchema,'trimesters');