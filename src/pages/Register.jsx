import React, { useState } from 'react'
import classes from './Register.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProviders'

const Register = () => {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [usernameInput, setUsernameInput] = useState('')
  const [avatarNameInput, setAvatarNameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    if (passwordInput === confirmPasswordInput) {
      try {
        await register(usernameInput, avatarNameInput, passwordInput)
        navigate('/login')
        alert('Your account has been successfully created.')
      } catch (err) {
        console.log(err.message)
        alert(err.message)
      }
    } else {
      alert('Password Incorrect')
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.title}>Register</div>

      <form className={classes.form} onSubmit={handleRegister}>
        <div className={classes.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={(e) => setUsernameInput(e.target.value)} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="username">Your Name</label>
          <input type="text" onChange={(e) => setAvatarNameInput(e.target.value)} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={(e) => setPasswordInput(e.target.value)} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Confirm Password</label>
          <input type="password" onChange={(e) => setConfirmPasswordInput(e.target.value)} />
        </div>
        <div className={classes.formGroup}>
          <button type="submit">Register</button>
        </div>
      </form>
      <Link to="/login" className={classes.subtitle}>{`Already have an account? Login`}</Link>
    </div>
  )
}

export default Register
