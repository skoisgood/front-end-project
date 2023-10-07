import React from 'react'
import classes from './Delete.module.css'
import { useNavigate, useParams } from 'react-router-dom'

const Delete = () => {
  const { id } = useParams()
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  const handleDelete = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:8000/content/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      return data
    } catch (err) {
      console.log(err)
    } finally {
      navigate(`/`)
    }
  }

  return (
    <button className={classes.deleteButton} onClick={handleDelete}>
      Delete
    </button>
  )
}

export default Delete
