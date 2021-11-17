import React, { useState, useEffect, useRef } from 'react'
import { FaImage, FaYoutube, FaNewspaper,FaThumbsUp } from 'react-icons/fa'
import aldata from './AuminiData'
import stdata from './StructureData'
import axios from 'axios'
import k from '../image/k.png'
import Nav2 from './Nav2'

function Account(props) {
    const [mass, setMass] = useState('')
    const [count, setCount] = useState(0)
    const [dis, setDis] = useState('none')
    const [dis2, setDis2] = useState('none')
    const [dis3, setDis3] = useState('none')
    const [dis4, setDis4] = useState('none')
    const [dis5, setDis5] = useState('block')
    const [m, setM] = useState([])
    const [top, setTop] = useState('')
    const [art, setArt] = useState('')
    const photoInput = useRef(null)
    const [post,setPost]=useState([])
    const [load,setLoad]=useState(true)
    const [Pics,setPics]=useState([])
    const [picture,setPicture]=useState([])
    const artdata={
        name: props.location.state[0].data.Name,
        type:top,
        Massage:art,
        Like:0
    }

    const send= async ()=>{
        const res = await fetch('/Article', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(artdata)
        })
        const data=await res.json()
        if(data==='yes'){
            alert('Article Save successfully')
        }
        
        setTop('')
        setArt('')
        setCount(count+1)
    }
    const [newUser, setNewUser] = useState(
        {
            name: props.location.state[0].data.Name,
            photo: '',
            type: '',
            Massage: '',
            Like:0
        }
    );
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();


        formData.append('name', newUser.name);
        formData.append('photo', newUser.photo);
        formData.append('type', newUser.type);
        formData.append('Massage', newUser.Massage);
        formData.append('Like',newUser.Like);

        axios.post('/add', formData)
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
        setNewUser({ ...newUser, Massage: '' })
    }

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    }

    const handlePhoto = (e) => {
        setNewUser({ ...newUser,[e.target.name]: e.target.files[0] });
        popup3()
    }
   
    const changeInput = (e) => {
        setMass(e.target.value)
    }
    const show=async()=>{
        const res=await fetch('/getPic')
        const data=await res.json()
        setPics(data)
        const a=data.find(d=>{
            if(d.email==props.location.state[0].data.Email){
                return(d)
            }
        })
        setPicture([a])
    }
    const hide=()=>{
        setDis5('none')
    }
    useEffect(async () => {
        const res = await fetch('/massageR')
        const smsarray = await res.json()
        setM(smsarray)
        axios.request('/Post').then(function (response) {
            setPost(response.data)
            setLoad(false)
          }).catch(function (error) {
            console.error(error);
          });
          show()
          if(load){
            return(<h1>Loading......</h1>)
          }   
    }, [count])
    
    const LikeUpdate=async (like,likeC)=>{
        likeC=likeC+1
        const res = await fetch('/LikeUpd', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({pho:like,Like:likeC})
        })
        const data=await res.json()
        console.log(data)
        if(data==="ok"){
            setCount(count+1)
        }
    }
    const popup = () => {
        setDis('block')
    }
    const popdown = () => {
        setDis('none')
    }
    const popup2 = () => {
        setDis2('block')
    }
    const popdown2 = () => {
        setDis2('none')
    }
    const popup3 = () => {
        setDis3('block')
    }
    const popdown3 = () => {
        setDis3('none')
    }
    const popup4 = () => {
        setDis4('block')
    }
    const popdown4 = () => {
        setDis4('none')
    }
    const handleTop = (e) => {
        setTop(e.target.value)
    }
    const handleArt = (e) => {
        setArt(e.target.value)
    }
    const handleKey = async (e) => {

        if (e.key === 'Enter') {
            const res = await fetch('/massageS', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ Nam: props.location.state[0].data.Name, massage: mass })
            })
            const data = await res.json()
            setCount(count + 1)
            setMass('')
            e.preventDefault()
        }
    }

    const photohandle = () => {
        photoInput.current.click()
        setNewUser({ ...newUser, type: 'im' })
    }
    const videohandle = () => {
        photoInput.current.click()
        setNewUser({ ...newUser, type: 'vi' })
    }
    return (
        <div className='d14'>
            <div id="myModal" className="modal" style={{ display: dis }}>
                <div className="modal-content">
                    <span className="close" onClick={popdown}>&times;</span>
                    {aldata.map((alu) => (<div className='Alu' key={alu.id}><img src={alu.im} alt='al' />
                        <h3>{alu.Name}({alu.Post})</h3>
                        <span>Company:{alu.Company}</span>
                        <span>Branch:{alu.Branch}</span></div>))}
                </div>
                </div>
            <div id="myModal" className="modal" style={{ display: dis2 }}>
                <div className="modal-content">
                    <span className="close" onClick={popdown2}>&times;</span>
                    {stdata.map(data => (<div className='st' key={data.id}>
                        <img src={data.im} alt='aa' />
                        <h3>{data.Name}({data.Post})</h3>
                        <span>Batch:{data.Batch}</span>
                        <span>Branch:{data.Branch}</span>
                    </div>))}
                </div>

            </div>
            <div id="myModal" className="modal" style={{ display: dis4 }}>
                <div className="modal-content">
                    <span className="close" onClick={popdown4}>&times;</span>
                    <h3>Enter Topic:</h3><textarea className='Topic' value={top} onChange={handleTop} />
                    <h1><u>Write your Thoughts</u></h1>
                    <input type='number' name='type' value={artdata.Like}  style={{ display: 'none' }} />
                    <textarea className='art' value={art} onChange={handleArt} />
                    <button className='btn' onClick={send}>Post</button>
                </div>

            </div>
            <Nav2 f1={popup} f2={popup2} l={{pathname:'/profile',state:[{data:props.location.state[0].data}]}} pi={picture}/>

            
            <div className='d16'>
                <div className='d17'>
                    <h2><u>Massage Box</u></h2>
                    <div className='massage'>
                        {m.map(sms => <div key={sms._id}>
                            <h5>{sms.Nam}:</h5>
                            <p>{sms.massage}</p>
                        </div>)}
                    </div>
                    <input type='text' value={mass} placeholder='Massage' onChange={changeInput} onKeyPress={handleKey} />
                </div>
                <div className='d18'>
                    <div className='post'>
                        <h1>New Post</h1>
                        <span>Photo</span>
                        <FaImage className='i i1' onClick={photohandle} /><span>video</span>
                        <FaYoutube className='i i2' onClick={videohandle} /><span>Article</span> <FaNewspaper className='i i3' onClick={popup4} />
                        <form onSubmit={handleSubmit} encType='multipart/form-data'>
                            <input type='text' name='name' value={newUser.name} style={{ display: 'none' }} />
                            <input type='file' id='file' ref={photoInput} style={{ display: 'none' }} name='photo' onChange={handlePhoto} accept=".png, .jpg, .jpeg ,.mp4" />
                            <input type='text' name='type' value={newUser.type} onChange={handleChange} style={{ display: 'none' }} />
                            <input type='number' name='type' value={newUser.Like}  style={{ display: 'none' }} />
                            <div id="myModal" className="modal" style={{ display: dis3 }}>
                                <div className="modal-content">
                                    <span className="close" onClick={popdown3}>&times;</span>
                                    <h1 className='font-effect-fire'> Thought For Your Post</h1>
                                    
                                    <textarea className='sms ' type="textarea" name='Massage' value={newUser.Massage} onChange={handleChange} />
                                    <input className='pt' type='submit' value='post' onClick={popdown3} />
                                </div>
                            </div>
                        </form>
                    </div>
                    {post.map(post=>{
                        
                        
                        if(post.type=='im'){
                            let a=Pics.find(d=>{
                                if(d.name==post.name){
                                    return(d)
                                }})
                                if(a){
                                var pa=require('../images/'+a.pic).default}
                                else{
                                    var pa=k
                                }
                            let image = require('../images/'+ post.photo);
                        return(<div className='post'>
                            <div className='intro'><img src={pa} alt='ok'/><h4>{post.name}</h4>
                            <p>{post.Massage}</p></div>
                            <img src={image.default}/>
                              <div className='like'><FaThumbsUp className='likeicon' onClick={()=>LikeUpdate(post.photo,post.Like)}/><span>{post.Like}</span></div>
                            </div>)
                        }
                        else {
                            if(post.type=='vi'){
                                let a=Pics.find(d=>{
                                    if(d.name==post.name){
                                        return(d)
                                    }})
                                    if(a){
                                        var pa=require('../images/'+a.pic).default}
                                        else{
                                            var pa=k
                                        }
                            
                                let video = require('../images/'+ post.photo);
                                return(<div className='post'>
                                <div className='intro'><img src={pa} alt='ok'/><h4>{post.name}</h4>
                            <p>{post.Massage}</p></div>
                                <video  controls>
                                <source src={video.default} type='video/mp4'/>
                                </video>
                                <div className='like'><FaThumbsUp className='likeicon' onClick={()=>LikeUpdate(post.photo,post.Like)}/><span>{post.Like}</span></div>
                                </div>)
                            }
                            else{
                                let a=Pics.find(d=>{
                                    if(d.name==post.name){
                                        return(d)
                                    }})
                                    if(a){
                                        var pa=require('../images/'+a.pic).default}
                                        else{
                                            var pa=k
                                        }
                            
                                return (<div className='post'>
                                    <div className='intro'><img src={pa} alt='ok'/><h4>{post.name}</h4></div>
                                    <h3>{post.type}</h3>
                                    <div className='artic'>{post.Massage}</div>
                                    <div className='like'><FaThumbsUp className='likeicon' onClick={()=>LikeUpdate(post.photo,post.Like)}/><span>{post.Like}</span></div>
                                </div>)
                            }
                        }
                    }
                    )}
                </div>
                <div className='d19'>
                <button onClick={hide}>memeber</button>
                    {Pics.map(user=>{
                        let p = require('../images/'+ user.pic);
                        return(<div className='ddd' style={{ display: dis5 } }>
                        <img src={p.default} alt='asa'/>
                        <h3>{user.name}({user.pos})</h3>
                    </div>)
                    })}
                     
                </div>
            </div>
        </div>

    )
}

export default Account
