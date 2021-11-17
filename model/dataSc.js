const mongoose = require('mongoose')
const massSc=new mongoose.Schema({
    Nam:String,
    massage:String
})
const massage= new mongoose.model('massage',massSc);
module.exports=massage
