const express = require('express');
require("dotenv").config();
const router = express.Router();
const multer = require('multer')
const { v4: uuidv4 } = require('uuid');
let path = require('path');
let User = require('../model/PostSC');
let Pic =require('../model/editSc')
const bcrypt = require('bcryptjs')
const student = require('../model/dataschema')
const isEmail = require('validator/lib/isEmail');
const massage=require('../model/dataSc')
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'client/src/images');
    },
    filename: function(req, file, cb) {   
        cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png','video/mp4'];
    if(allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
let upload = multer({ storage, fileFilter });
router.route('/add').post(upload.single('photo'), (req, res) => {
console.log('hi')
    const name = req.body.name;
    const photo = req.file.filename;
    const type = req.body.type;
    const Massage = req.body.Massage;
    const Like=   req.body.Like;
        const newUserData = {
        name,
        photo,
        type,
        Massage,
        Like
    }

    const newUser = new User(newUserData);
    console.log(newUserData)
    newUser.save()
           .then(() => res.json('User Added'))
           .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/profilePic').post(upload.single('pic'),async (req, res) => {
    console.log('hi')
        const name = req.body.name;
        const email=req.body.email;
        const pic=req.file.filename;
        const pos=req.body.pos;
            const newUserData = {
            name,
            email,
            pic,
            pos
        }
        const a=await Pic.findOne({email:email})
        if(a){
            console.log(a)
            res.json('not')
        }
        else{
            const newUser = new Pic(newUserData);
        console.log(newUserData)
        newUser.save()
               .then(() => res.json('User Added'))
               .catch(err => res.status(400).json('Error: ' + err));}
    });
    router.post('/DelAcc' ,async (req, res)=>{
        const Email=req.body.Email
        const Name=req.body.Name
        const up=await student.deleteMany({Email:Email})
        const up2=await Pic.deleteMany({email:Email})
        const up4=await User.deleteMany({name:Name})
        if(up){
            res.json('ok')
        }
        else{
            res.jason('not')
        }
      })

router.post('/UpdateN' ,async (req, res)=>{
  const Email=req.body.Email
  const NameNew=req.body.NameNew
  const up=await student.updateMany({Email:Email},{$set:{Name:NameNew}})
  const up2=await Pic.updateMany({email:Email},{$set:{name:NameNew}})
  const up3=await massage.updateMany({Nam:req.body.Name},{$set:{Nam:NameNew}})
  const up4=await User.updateMany({name:req.body.Name},{$set:{name:NameNew}})
  if(up){
      res.json('ok')
  }
  else{
      res.jason('not')
  }
})
router.post('/UpdateNum' ,async (req, res)=>{
    const Email=req.body.Email
    const NumberNew=req.body.NumberNew
    const up=await student.updateOne({Email:Email},{$set:{Mumber:NumberNew}})
    if(up){
        res.json('ok')
    }
    else{
        res.jason('not')
    }
  })
  router.post('/UpdatePost' ,async (req, res)=>{
      console.log(req.body)
    const Email=req.body.Email
    const PostNew=req.body.PostNew
    const up=await Pic.updateOne({email:Email},{$set:{pos:PostNew}})
    if(up){
        res.json('ok')
    }
    else{
        res.jason('not')
    }
  })

router.post('/Ragister', async (req, res) => {
    const { Name, Email, Age, Mumber, Password, CPassword } = req.body;
    if (!Name || !Email || !Age || !Mumber || !Password || !CPassword) {
        await res.status(422).send(false)
    }
    if (Password != CPassword) {
        await res.json('p')
    }
    else{
    const em = await isEmail(Email)
    if (!em) {
        await res.json('em')
    }
    const match = await student.findOne({ Email: Email })
    if (match) {
        
        await res.json('e')
    }
    else {
        console.log('haloow')
        const s1 = new student(req.body)
        const ok = await s1.save()
        if (ok) {
            console.log(ok)
            res.send(true)
        }
    }

    }
})
router.get('/getPic',async (req, res)=>{
    const a=await Pic.find()
    res.send(a)
})
router.post('/Login', async (req, res) => {

    console.log(req.body)
    if (!req.body.Email || !req.body.Password) {
        console.log('a')
        await res.send(false)
    }
    
    const d =  await student.findOne({ Email: req.body.Email })
    if (d==null){
        await res.send(false)
    }
    const mat = await bcrypt.compare(req.body.Password, d.Password)
    
    if (d) {
       
        if (mat) {
            console.log(mat)
            await res.json(d)
        }
        else {
            return res.json(false)

        }
    }
    else {
        await res.send(false)

    }

})
router.post('/LikeUpd',async (req,res)=>{
    console.log(req.body)
    const like=await User.updateOne({photo:req.body.pho},{$set:{Like:req.body.Like}})
    if(like.acknowledged){
        console.log('hi')
        res.json("ok")
    }
    else{
        res.send('not ok')
    }
})
router.post('/delArt',async (req, res)=>{
    const p=await User.deleteOne({Massage:req.body.pos})
    console.log(p)
    if(p.deletedCount==1){
        res.send('ok')
    }
    else{
        res.send('not ok')
    }
})
router.post('/delPost',async (req, res)=>{
    const p=await User.deleteOne({photo:req.body.pos})
    console.log(p)
    if(p.deletedCount==1){
        res.send('ok')
    }
    else{
        res.send('not ok')
    }
})
router.get('/Post',async (req,res)=>{
    const po=await User.find()
    res.send(po.reverse())
})
router.post('/selfPost',async (req,res)=>{
    const s=await User.find({name:req.body.Name})
    res.status(200).send(s.reverse())
})
router.post('/Article', async (req, res)=>{
    const a= await new User(req.body)
    const s=await a.save()
    if(s){
        res.json('yes')
    }
})
router.post('/massageS',async (req,res)=>{

      const m = new massage(req.body)
     const n=await m.save()
     res.status(200).json('ok')
  
})
router.get('/massageR',async (req,res)=>{
    const ma=await massage.find()
    res.send(ma)
})
module.exports = router