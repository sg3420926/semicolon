const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const stuSc= new mongoose.Schema({
    Name:{
        type: String,
        required: true,
        maxLength:20,
        minLength:4
    },
    Email:{
        type: String,
        required: true,
    },
    Age:{
        type: String
    },
    Mumber:{
          type: String
    },
    Password:{
        type: String,
        required: true
    },
    CPassword:{
        type: String,
        required: true
    },
    Photo:{
        type: String,
    }
})


stuSc.pre('save', async function(next){

if(this.isModified('Password')){
this.Password=await bcrypt.hash(this.Password,12);
this.CPassword= await bcrypt.hash(this.CPassword,12);
}
next();
})
const student=new mongoose.model('student',stuSc);

module.exports =student
