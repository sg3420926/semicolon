const express=require('express');
const dotenv=require('dotenv')
const mongoose=require("mongoose")
const cors = require('cors');
const student =require('./model/dataschema')
const app=express()
const path =require('path');
require('dotenv').config();
app.use(express.json())
dotenv.config({path:"./config.env"});
require('./db/databse')

const PORT=process.env.PORT||8000;
mongoose.connect(process.env.DB,{
    useNewUrlParser: true
}).then(()=>{
    console.log('again')
});

app.use(cors());
app.use(require('./route/auth'))
if(process.env.NODE_ENV==='production'){
    app.use(express.static('client/build'));

    app.get('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'client','build','index.html'))
    })
}

app.listen(PORT,()=>{
    console.log('tq')
})