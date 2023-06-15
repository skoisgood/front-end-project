import React from 'react'
import classes from './Post.module.css'

const Post = (props) => {
  const { post } = props

  //   const countStar = {post.rating}
  return (
    <div className={classes.card}>
      <img className={classes.thumbnail} src={post.thumbnailUrl}></img>
      {/* <ReactPlayer url={'https://youtu.be/bdT8ixdxPX4'} light={true} /> */}

      <div>{post.videoTitle}</div>
      <div>{post.creatorName}</div>
      <div>{post.comment}</div>
      <div>{post.postedBy.name}</div>
      <div>
        {[...Array(post.rating).keys()].map((star) => (
          <img key={star} className={classes.star} src="/star.svg" alt="Rating Star" />
        ))}
      </div>
    </div>
  )
}

export default Post
