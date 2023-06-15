import React, { useState } from 'react'
import classes from './Login.module.css'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../providers/AuthProviders'

const Login = () => {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [isSubmitting, setSubmitting] = useState(false)
  const [usernameInput, setUsernameInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    setSubmitting(true)

    try {
      await login(usernameInput, passwordInput)
      navigate('/')
    } catch (err) {
      console.log(err)
    } finally {
      setSubmitting(false)
    }
  }
  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Login</h1>

      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="username">Username</label>
          <input type="text" onChange={(e) => setUsernameInput(e.target.value)} />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={(e) => setPasswordInput(e.target.value)} />
        </div>
        <div className={classes.formGroup}>
          <button type="submit" disabled={isSubmitting}>
            Login
          </button>
        </div>
      </form>

      <Link to="/register" className={classes.subtitle}>{`Don't have an account? Register`}</Link>
    </div>
  )
}

export default Login
