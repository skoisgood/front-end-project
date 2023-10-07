import React from 'react'
import { Link, useParams } from 'react-router-dom'
import usePost from '../hooks/usePost'
import classes from './PostDetail.module.css'
import ReactPlayer from 'react-player'
import { useAuth } from '../providers/AuthProviders'
import Delete from './Delete'

const PostDetail = () => {
  const { id } = useParams()
  const { post, isLoading } = usePost(id)
  const { username } = useAuth()

  //   if (isLoading) return <h1>Loading...</h1>

  return (
    <div>
      {post && (
        <>
          <div className={classes.container}>
            <div className={classes.content}>
              <div className={classes.setCenter}>
                <div className={classes.title}>{post.videoTitle}</div>
                <div className={classes.subtitle}>{post.creatorName}</div>
                <ReactPlayer url={post.videoUrl} />
              </div>

              <div className={classes.commentContainer}>
                <p className={classes.commentText}>{post.comment}</p>

                <div className={classes.commentFooter}>
                  <p>
                    {[...Array(post.rating).keys()].map((star) => (
                      <img key={star} className={classes.icon} src="/star.svg" alt="Rating Star" />
                    ))}
                  </p>
                  <div className={classes.postBy}>
                    <span className={classes.emdash}>&mdash;</span> {post.postedBy.name}
                  </div>
                  <div>Created on {post.createdAt.substring(0, 10)}</div>

                  {post.createdAt === post.updatedAt ? null : <div>Updated on {post.updatedAt.substring(0, 10)}</div>}
                  <div className={classes.groupIcon}>
                    {post.postedBy.username === username ? (
                      <Link to={`/content/${post.id}/edit`}>
                        <img className={classes.editicon} src="/edit.svg" alt="Edit" />
                      </Link>
                    ) : null}
                    {post.postedBy.username === username ? <Delete /> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default PostDetail
