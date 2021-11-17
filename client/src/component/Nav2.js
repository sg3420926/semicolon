import React from 'react'
import p1 from '../image/k.png'
import {Link} from 'react-router-dom'
function Nav2(props) {

    return (
        <div className='d15'>
                 <div className='d'><h2>; semicolon</h2>
                 {props.pi.map(p=>{
                    if(p){
                    return(<span className='name'>{p.name}</span>)
                }
                    else{
                        return(<span>''</span>)}
                    })}
            </div>
                
                <span><a onClick={props.f1}>Our Alumni</a></span>
                <span><a onClick={props.f2}>Structures</a></span>
                {props.pi.map(p=>{
                    if(p){
                    let path=require('../images/'+p.pic)
                    return(<img src={path.default} alt='as' />)}
                    else{
                        return(<img src={p1} alt='as' />)}
                    })
                }
                
                <span><Link to={props.l}>Profile</Link></span>
                <span><Link to='/Login'>Logout</Link></span>
        </div>
    )
}

export default Nav2
