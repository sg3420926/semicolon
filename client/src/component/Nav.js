import React from 'react'
import {Link} from "react-router-dom"
function Nav() {
    return (
        <div className="d1">
            <Link className='l1' to='/About'><span>About us</span></Link>
            <Link className='l1' to='/Login'><span>Login</span></Link>
            <Link className='l1' to='/'><span>Register</span></Link>
        </div>
    )
}

export default Nav
