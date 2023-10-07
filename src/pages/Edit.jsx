import React, { useEffect, useState } from 'react'
import classes from './Edit.module.css'
import ReactStars from 'react-stars'
import { useNavigate, useParams } from 'react-router-dom'
import usePost from '../hooks/usePost'

const Edit = () => {
  const { id } = useParams()
  const { post } = usePost(id)
  const [rating, setRating] = useState(0)
  const navigate = useNavigate()
  const token = localStorage.getItem('token')
  const [comment, setNewComment] = useState('')

  useEffect(() => {
    if (post) {
      setNewComment(post.comment)
      setRating(post.rating)
    }
  }, [post])

  const handleEdit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:8000/content/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          comment: comment,
          rating: rating,
        }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await res.json()
      console.log(data)

      // alert('Success')
      return data
    } catch (err) {
      console.log(err)
    } finally {
      navigate(`/content/${id}`)
    }
  }

  const setStarValue = (newrating) => {
    setRating(newrating)
  }
  return (
    <div className={classes.container}>
      <div className={classes.title}>Edit content</div>
      <form className={classes.form} onSubmit={handleEdit}>
        <div className={classes.formGroup}>
          <label htmlFor="comment">Comment (280 characters maximum)</label>
          <input type="text" value={comment} onChange={(e) => setNewComment(e.target.value)} />
        </div>
        <div className={classes.formGroup}>
          <div className={classes.ratingContainer}>
            <label>Rating</label>
            <ReactStars count={5} value={rating} size={42} half={false} onChange={setStarValue} color2="#ff731d" />
          </div>
        </div>
        <div className={classes.formGroup}>
          <button type="submit">Edit</button>
        </div>
      </form>
    </div>
  )
}

export default Edit
