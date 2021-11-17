import React,{useState,useEffect} from 'react'
import {FaGoogle,FaFacebook,FaLinkedin} from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import Nav from './Nav'
function Login() {
    const history=useHistory()
    const [Log,setLog]=useState({Email:'',Password:''})
    const change=(e)=>{
        setLog({...Log,[e.target.name]:e.target.value})
        e.preventDefault();
    }
    useEffect(()=>{
        
    },[])
    const send= async ()=>{
        const res=await fetch('/Login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(Log)
        })
        const data=await res.json()
    
        if(data!==false){
            console.log(data)
       history.push({
           pathname:'/Welcome',
           state:[{data:data}]
       })
        }
        else{
            alert('Incorrect Credential')
        }

    }
    return (
        <>
        <div className='d2 d7'>
        <Nav/>
            
            <span className='s1'>;</span>
            <span className='s2'>Semicolon</span>
        <div className='d3 d8' >
            <h1>Login</h1>
            <div className='d6'>
         Email-
         <input type='email' value={Log.Email} name='Email' onChange={change}/>
         Password-
         <input type='password' value={Log.Password} name='Password' onChange={change}/>
         <button onClick={send}>Ok</button>
         </div>
         <div className='d5'>
             <h2>Welcome In Our Family</h2>
            <h4>login with</h4>
           <FaGoogle className='icon'/><FaFacebook className='icon'/><FaLinkedin className='icon'/>
         </div>
        </div>
        </div>
        </>
    )
}

export default Login
