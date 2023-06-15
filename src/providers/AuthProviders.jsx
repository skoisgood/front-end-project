import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  return context
}

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const AuthProvider = (props) => {
  const { children } = props
  const [isLoggedIn, setIsLoggedIn] = useState(!!token)
  const [username, setUsername] = useState(user)

  const login = async (username, password) => {
    const loginInfo = { username, password }

    try {
      const res = await fetch('https://api.learnhub.thanayut.in.th/auth/login', {
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

  return <AuthContext.Provider value={{ isLoggedIn, login, username, logout, token }}>{children}</AuthContext.Provider>
}

export default AuthProvider
