import React, { useEffect, useState } from 'react'
import k from '../image/k.png'
import { Link } from 'react-router-dom'
import Nav2 from './Nav2'
import aldata from './AuminiData'
import stdata from './StructureData'
function Profile(props) {
    const [po, setPo] = useState([])
    const [count, setCount] = useState(0)
    const [dis, setDis] = useState('none')
    const [dis2, setDis2] = useState('none')
    const [Pics,setPics]=useState([])
    const [picture,setPicture]=useState([])
    const show=async()=>{
        const res=await fetch('/getPic')
        const data=await res.json()
        setPics(data)
        const a=data.find(d=>{
            if(d.email===props.location.state[0].data.Email){
                return(d)
            }
        })
        setPicture([a])
    
    }
    useEffect(async () => {
        const res = await fetch('/selfPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Name: props.location.state[0].data.Name })
        })
        const data = await res.json()
        setPo(data)
        show()
    }, [count])
    const del=async(e)=>{
        const res = await fetch('/delArt', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pos:e.target.value })
        })
        const d=res.json()
        if(d==='ok'){
         alert('post deleted')
         
        }
        else{
            alert('Post is not deleted')
        }
        setCount(count+1)
    }
    const del2=async(e)=>{
        const res = await fetch('/delPost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pos:e.target.value })
        })

        const d=res.json()
        if(d==='ok'){
         alert('post deleted')
        }
        else{
            alert('Post is not deleted')
        }
        setCount(count+1)
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
    return (
        <div className='p1'>
            <Nav2 f1={popup} f2={popup2} l={{pathname:'/profile',state:[{data:props.location.state[0].data}]}} pi={picture}/>
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
            <div className='p2'>
            {picture.map(posi=>{
                    if(posi){
                        return(<img src={require('../images/'+posi.pic).default} alt='oko' />)
                    }
                    else{
                        return(<img src={k} alt='ok' />)
                    }
                })}
                
                <h2>{props.location.state[0].data.Name}</h2>
                {picture.map(posi=>{
                    if(posi){
                        return(<h3>{posi.pos}</h3>)
                    }
                    else{
                        return(null)
                    }
                })}
                <Link className='link' to={{pathname:'/editor',state:[{data:props.location.state[0].data}]}}>Edit</Link>
            </div>
            <div className='p3'>
                <h1>MY POST</h1>
                {po.map(post => {
                    if (post.type === 'im') {
                        let a=Pics.find(d=>{
                            if(d.name===post.name){
                                return(d)
                            }})
                            if(a){
                                var pa=require('../images/'+a.pic).default}
                                else{
                                    var pa=k
                                }
                    
                        let image = require('../images/' + post.photo);
                        return (<div className='post'>
                            <div className='intro'><img src={pa} alt='ok' /><h4>{post.name}</h4><button value={post.photo}
                             onClick={del2}>Delete</button>
                                <p>{post.Massage}</p></div>
                            <img src={image.default} />
                        </div>)
                    }
                    else {
                        if (post.type == 'vi') {
                            let a=Pics.find(d=>{
                                if(d.name==post.name){
                                    return(d)
                                }})
                                if(a){
                                    var pa=require('../images/'+a.pic).default}
                                    else{
                                        var pa=k
                                    }
                        
                            let video = require('../images/' + post.photo);
                            return (<div className='post'>
                                <div className='intro'><img src={pa} alt='ok' /><h4>{post.name}</h4><button value={post.photo} 
                                onClick={del2}>Delete</button>
                                    <p>{post.Massage}</p></div>
                                <video controls>
                                    <source src={video.default} type='video/mp4' />
                                </video>
                            </div>)
                        }
                        else {
                            let a=Pics.find(d=>{
                                if(d.name===post.name){
                                    return(d)
                                }})
                                if(a){
                                    var pa=require('../images/'+a.pic).default}
                                    else{
                                        var pa=k
                                    }
                        
                            return (<div className='post'>
                                <div className='intro'><img src={pa} alt='ok' /><h4>{post.name}</h4>
                                <button onClick={del} value={post.Massage}>Delete</button><p>{post.type}</p>
                                </div>
                                <h3>{post.type}</h3>
                                <div className='artic'>{post.Massage}</div>
                            </div>)
                        }
                    }
                })
                }
            </div>
        </div>
    )
}

export default Profile
