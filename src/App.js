import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import Create from './pages/Create'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import PostDetail from './pages/PostDetail'
import Register from './pages/Register'
import GuardedRoute from './guards/GuardedRoute'
import { useAuth } from './providers/AuthProviders'
import Edit from './pages/Edit'

function App() {
  const { isLoggedIn } = useAuth()
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/content/:id" element={<PostDetail />} />

        <Route element={<GuardedRoute isRouteAccessible={isLoggedIn} redirectRoute="/" />}>
          <Route path="/create" element={<Create />} />
          <Route path="/content/:id/edit" element={<Edit />} />
        </Route>

        <Route element={<GuardedRoute isRouteAccessible={!isLoggedIn} redirectRoute="/" />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
