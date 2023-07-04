import React, { useContext, useState } from 'react'
import { UserContext } from '../context/user'

function SignUpForm () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useContext(UserContext)

  function onSubmit(e) {
    e.preventDefault()

    const userData = {
      email,
      password
    }
    fetch(`/users`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(userData)
    })
    .then(res => {
      if(res.ok){
        res.json().theN(setUser(userData))
      } else {
        res.json().then(data => {console.log(data.error)})
      }
    })
  }



  return (
    <form onSubmit={onSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type='password'
        placeholder='Password'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUpForm