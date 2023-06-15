import React from 'react'
import classes from './Navbar.module.css'
import { Link } from 'react-router-dom'
import { useAuth } from '../providers/AuthProviders'

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth()
  return (
    <div className={classes.navbar}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <div className={classes.layoutlogo}>
          <img className={classes.imglogo} src="./logo.svg" />
          <span className={classes.learnhub}>LearnHub</span>
        </div>
      </a>
      <div className={classes.buttoncontainer}>
        {isLoggedIn ? (
          <>
            <Link to="/login" className={classes.button} onClick={logout}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className={classes.button}>
              Login
            </Link>
            <Link to="/register" className={classes.button}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar
