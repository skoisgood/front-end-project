import React from 'react'
import classes from './Banner.module.css'

const Banner = () => {
  return (
    <div className={classes.banner}>
      <div className={classes.title}>LearnHub</div>
      <div className={classes.subtitle}>Hub for Educational Videos</div>
    </div>
  )
}

export default Banner
