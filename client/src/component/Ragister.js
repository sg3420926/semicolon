import React,{useState} from 'react'
import Nav from './Nav'
import {FaGoogle,FaFacebook,FaLinkedin} from 'react-icons/fa'
import {useHistory} from 'react-router-dom'


function Ragister() {
    const history=useHistory()
    const [Pata,setPata] = useState({Name:'',Email:'',Age:'',Mumber:'',Password:'',CPassword:''})
    const changeHandle = (e)=>{
    setPata({...Pata,[e.target.name]:e.target.value})
     e.preventDefault();
    }
    const sendData= async ()=>{
        
        const res=await fetch('/Ragister',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(Pata)
        })
        const data=await res.json()
        if(data===true){
            alert('ragistraton success')
            history.push('/Login')
        }
        else{
            if(data===false){
                alert("Credential is wrong")
            }
            
            }
            
        if(data==='p'){
           alert("password not matching") 
        }
        if(data==='e'){
            alert("Email is already ragistered")
        }
        if(data==='em'){
            alert("Email is not valid")
        }

    }
    return (
        <>
        <div className='d2'>
        <Nav/>
            
            <span className='s1'>;</span>
            <span className='s2'>Semicolon</span>
        <div className='d3' >
            <h1>Ragister</h1>
            <div className='d6'>
            Name-
         <input type='text' value={Pata.Name} name='Name' onChange={changeHandle}/>
         Email-
         <input type='email' value={Pata.Email} name='Email' onChange={changeHandle}/>
         Age-
         <input type='text' value={Pata.Age} name='Age' onChange={changeHandle}/>
         Number-
         <input type='text' value={Pata.Mumber} name='Mumber' onChange={changeHandle}/>
         Password-
         <input type='password' value={Pata.Password} name='Password' onChange={changeHandle}/>
         Confirm Password-
         <input type='password' value={Pata.CPassword} name='CPassword' onChange={changeHandle}/>
         <button onClick={sendData}>Ok</button>
         </div>
         <div className='d5'>
             <h2>Welcome In Our Family</h2>
            <h4>sign with</h4>
           <FaGoogle className='icon'/><FaFacebook className='icon'/><FaLinkedin className='icon'/>
         </div>
        </div>
        </div>
        
        </>
    )
}

export default Ragister
