import React from 'react'
import Post from '../components/Post'
import usePosts from '../hooks/usePosts'
import classes from './Home.module.css'
import Banner from '../components/Banner'
import { useAuth } from '../providers/AuthProviders'
import { Link } from 'react-router-dom'

const Home = () => {
  const { posts, setPosts, isLoading } = usePosts()
  const { isLoggedIn } = useAuth()
  return (
    <>
      <Banner />
      {isLoggedIn && (
        <div className={classes.containerCreateButton}>
          <Link to="/create" className={classes.button}>
            Create new content
          </Link>
        </div>
      )}

      <div className={classes.center}>
        {/* <div>{isLoading ? <h1>Loading...</h1> : null}</div> */}
        <div className={classes.container}>
          {posts &&
            posts.map((post) => {
              return <Post key={post.id} post={post} />
            })}
        </div>
      </div>
    </>
  )
}

export default Home
