'use client'

import YouTube from 'react-youtube'

const YoutubePlayer = () => {
  return (
    <div className=''>
      <video src="/demo.mp4"   controls className='relative w-full aspect-video overflow-hidden rounded-xl'></video>
    </div>
  )
}

export default YoutubePlayer