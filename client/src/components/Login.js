import React from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../context/user'
import { useContext } from 'react'
import SignUpForm from './SignUpForm'

function Login() {
    
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [displaySignUpForm, setDisplaySignUpForm] = useState(false)
    const [errors, setErrors] = useState([])
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    
    const history = useHistory()
    const {email, password} = formData

    function handleSubmit(e) {
        e.preventDefault()
        const userData = {
            email,
            password
        }

        fetch('/login', {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userData)
        })
        .then(r => {
            if (r.ok) {
                r.json().then(user => {
                    setCurrentUser(user)
                    history.push(`/cards`)
                })
            } else {
                r.json().then(data => setErrors(data.error))
                history.push(`/users/new`)
            }
        })
    }

    function handleChange(e) {
        const { name, value } = e.target
        setFormData({...formData, [name]: value })
    }

    function handleSignupClick() {
        setDisplaySignUpForm(!displaySignUpForm)
    }

  return (
    <div id='login_div'>
        <h1>Please Log In</h1>
        <form className="login-form" onSubmit={handleSubmit}>
            <label>
                Email
            </label>
            <input 
                type='text'
                name="email"
                value={email}
                onChange={handleChange}
            />
            <br/>
            <label>
                Password
            </label>
            <input 
                type='password'
                name='password'
                value={password}
                onChange={handleChange}
            />
            <br/>
            <input type='submit'/>
        </form>
        <br/>
        <br/>
        <button id='signup-button' onClick={handleSignupClick}>Sign Up</button>
        <br/>
        {displaySignUpForm ? <SignUpForm/> : null}
        {errors ? <div style={{color: "red"}}>{errors}</div> : null}
    </div>
  )
}

export default Login