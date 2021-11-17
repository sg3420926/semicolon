import React, { useState, useRef } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { FaHeart } from 'react-icons/fa'
function Edit(props) {
    const [picpo, setPicpo] = useState({
        Name: props.location.state[0].data.Name,
        Email: props.location.state[0].data.Email,
        pic: '',
        pos: 'guest'
    })
    const [inputs, setInputs] = useState({
        Name: '',
        number: '',
        position: ''
    })
    const hystory = useHistory()
    const handleInput = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value })
    }
    const updateName = async () => {
        const res = await fetch('/UpdateN', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ NameNew: inputs.Name, Email: props.location.state[0].data.Email, Name: props.location.state[0].data.Name })
        })
        const data = await res.json()
        if (data === 'ok') {
            alert('Name updated successfully and Login Again')
            hystory.push('/Login')
        }
        else {
            alert('something wrong')
        }
    }

    const updateNumber = async () => {
        const res = await fetch('/UpdateNum', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ NumberNew: inputs.number, Email: props.location.state[0].data.Email })
        })
        const data = await res.json()
        if (data === 'ok') {
            alert('Number updated successfully')
        }
        else {
            alert('something wrong')
        }
    }
    const delAcc= async()=>{
        const res = await fetch('/DelAcc', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Email: props.location.state[0].data.Email,Name:props.location.state[0].data.Name })
        })
        const data = await res.json()
        if (data === 'ok') {
            alert('Account deleted')
            hystory.push('/Login')
        }
        else {
            alert('something wrong')
        }
    }
    
    const updatePost = async () => {
        const res = await fetch('/UpdatePost', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ PostNew: inputs.position, Email: props.location.state[0].data.Email })
        })
        const data = await res.json()
        if (data === 'ok') {
            alert('Position updated successfully')
        }
        else {
            alert('something wrong')
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();


        formData.append('name', picpo.Name);
        formData.append('email', picpo.Email);
        formData.append('pic', picpo.pic);
        formData.append('pos', picpo.pos);

        axios.post('/profilePic', formData)
            .then(res => {
                if (res.data === 'not') {
                    alert('your pic is already set')
                }
                else {
                    alert('success')
                }
            })
            .catch(err => {
                console.log(err);
            });
    }
    const ppoin = useRef(null)
    const proInput = () => {
        ppoin.current.click();
    }
    const handleChange = (e) => {
        setPicpo({ ...picpo, [e.target.name]: e.target.value });
    }

    const handlePhoto = (e) => {
        setPicpo({ ...picpo, [e.target.name]: e.target.files[0] });
    }
    return (
        <div className='E'>
            <div className='E1'>
                <form onSubmit={handleSubmit} encType='multipart/form-data'>
                    <h3>Set Profile Photo</h3><input type='file' name='pic' ref={ppoin} style={{ display: 'none' }}
                        onChange={handlePhoto} accept=".jpg,.png,.jpeg" /><h3 className='E1I' onClick={proInput}>select</h3>

                    <h3>Set Position in Semicolon Club(if you are member)</h3><input className='E1I1'
                        value={picpo.pos} type='text' name='pos' onChange={handleChange} />
                    <input type='text' name='Name' value={picpo.Name} style={{ display: 'none' }} />
                    <input type='text' name='Email' value={picpo.Email} style={{ display: 'none' }} />
                    <input className='btn' type='submit' />
                </form>
            </div>
            <div className='E2'>
                <h4>Updation</h4>
                <div><span>Name</span><input type='text' name='Name' value={inputs.Name} onChange={handleInput} /><button onClick={updateName}>update</button></div>
                <div><span>Number</span><input type='text' name='number' value={inputs.number} onChange={handleInput} /><button onClick={updateNumber}>update</button></div>
                <div><span>Postion</span><input type='text' name='position' value={inputs.position} onChange={handleInput} /><button onClick={updatePost}>update</button></div>
                <button onClick={delAcc}>Delete Account</button>
            </div>
            <div className='E3'>
                <h2>please,Give me your feedback for this website :-</h2>
                <a href='mailto:sg3420926@gmail.com'>send email</a>
                <h5>whatapp-me-9024874427</h5><span>created by-</span>
                <h4>Master Saurabh Gupta(full stack web-devloper)</h4>
                <span>Thanks for your Love<FaHeart /></span>
            </div>

        </div>
    )
}

export default Edit
