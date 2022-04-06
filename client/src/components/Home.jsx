import React from 'react'
import video from '../assets/video.mp4'

const Home = () => {
  return (
    <div>
      <video className='video'
        autoPlay
        loop
        muted>
        <source src={video} type="video/mp4"/>
      </video>
      <h1 className=''>Home</h1>
    </div>
  )
}

export default Home