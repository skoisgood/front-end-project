import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import Create from './pages/Create'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
