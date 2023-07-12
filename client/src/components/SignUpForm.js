import React, { useContext, useState } from 'react'
import { UserContext } from '../context/user'

function SignUpForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const { currentUser, setCurrentUser } = useContext(UserContext)

  function onSubmit(e) {
    e.preventDefault()

    const userData = {
      email,
      password,
      username
    }
    fetch(`/users`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
    })
    .then(res => {
      if(res.ok){
        res.json().then(setCurrentUser)
          
      } else {
        res.json().then(data => {console.log(data.error)})
      }
    })
  }



  return (
    <div>
      <form className="signup-form" onSubmit={onSubmit}>
      <h2>Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="username"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}

export default SignUpForm