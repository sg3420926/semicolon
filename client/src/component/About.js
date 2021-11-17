import React from 'react'
import k from '../image/k.png'
import Nav from './Nav'
function About() {
    return (

        <div className='d11'>
            
            <Nav/>
        
        <div className='d12'>
         <a href='https://www.linkedin.com/in/saurabh-gupta-99b8911b3/' title='A'>  <img src={k} alt='wait'/></a>
         <a href='https://www.linkedin.com/in/saurabh-gupta-99b8911b3/' title='B'> <img src={k} alt='wait'/></a>
         <a href='https://www.linkedin.com/in/saurabh-gupta-99b8911b3/' title='C'> <img src={k} alt='wait'/></a>
         <a href='https://www.linkedin.com/in/saurabh-gupta-99b8911b3/' title='D'> <img src={k} alt='wait'/></a>
        </div>
        <div className='d13'>
          <h1>"</h1>This is dummy Data.........<br/><br/><br/><br/><br/><br/><h1>"</h1>
        </div>
        </div>
    )
}

export default About
