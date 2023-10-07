import React from 'react'
import classes from './Post.module.css'
import { Link } from 'react-router-dom'

const Post = (props) => {
  const { post } = props

  //   const countStar = {post.rating}
  return (
    <Link to={`/content/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}>
      <div className={classes.card}>
        <img className={classes.thumbnail} src={post.thumbnailUrl}></img>
        <div className={classes.detail}>
          <div className={classes.subdetail}>
            <div className={classes.title}>{post.videoTitle}</div>
            <div className={classes.subtitle}>{post.creatorName}</div>
            <div className={classes.comment}>{post.comment}</div>
          </div>
          <div className={classes.namestar}>
            <span>{post.postedBy.name}</span>
            <span>
              {[...Array(post.rating).keys()].map((star) => (
                <img key={star} className={classes.star} src="/star.svg" alt="Rating Star" />
              ))}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Post
