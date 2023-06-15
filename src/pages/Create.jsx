import React, { useState } from 'react'
import classes from './Create.module.css'
import { useNavigate } from 'react-router-dom'
import ReactStars from 'react-stars'
import { useAuth } from '../providers/AuthProviders'

const Create = () => {
  const [rating, setRating] = useState(0)
  const [isSubmitting, setSubmitting] = useState(false)
  const [url, setUrl] = useState('')
  const [comment, setComment] = useState('')
  const navigate = useNavigate()
  const { token } = useAuth() // Hint: we may need auth token for posting new content

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return
    setSubmitting(true)

    try {
      const res = await fetch('https://api.learnhub.thanayut.in.th/content', {
        method: 'POST',
        body: JSON.stringify({
          videoUrl: url,
          comment: comment,
          rating: rating,
        }),
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
      setSubmitting(false)
    }
    if (!isSubmitting) return navigate('/')
  }

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Create new content</h1>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.formGroup}>
          <label htmlFor="video-url">Video URL</label>
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor="comment">Comment (280 characters maximum)</label>
          <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <div className={classes.formGroup}>
          <div className={classes.ratingContainer}>
            <label>Rating</label>
            <ReactStars
              count={5}
              value={rating}
              size={42}
              half={false}
              onChange={(e) => setRating(e.target.value)}
              color2="#ff731d"
            />
          </div>
        </div>
        <div className={classes.formGroup}>
          <button type="submit" disabled={isSubmitting}>
            Create
          </button>
        </div>
      </form>
    </div>
  )
}

export default Create
