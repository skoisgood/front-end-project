import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

export const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const AuthProvider = (props) => {
  const { children } = props
  const [isLoggedIn, setIsLoggedIn] = useState(!!token)
  const [username, setUsername] = useState(user)

  const login = async (username, password) => {
    const loginInfo = { username, password }

    try {
      const res = await fetch('http://localhost:8000/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginInfo),
      })
      const data = await res.json()

      if (data.statusCode === 401) {
        //if status = 401 go to catch by using throw new error
        throw new Error(data.message)
      }

      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('user', username)
      setIsLoggedIn(true)
      setUsername(username)
    } catch (err) {
      //receive throw from above then throw error to user
      throw new Error(err.message)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    setUsername(null)
  }

  const register = async (username, avatarName, password) => {
    const registerInfo = {
      username: username,
      name: avatarName,
      password: password,
    }

    try {
      const res = await fetch('http://localhost:8000/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registerInfo),
      })
      const data = await res.json()
      //   console.log(data)

      if (data.statusCode === 409) {
        //if status = 409 go to catch by using throw new error
        throw new Error(data.message)
      }
    } catch (err) {
      //receive throw from above then throw error to user
      throw new Error(err.message)
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, username, logout, token, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
