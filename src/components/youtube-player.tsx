'use client'

import YouTube from 'react-youtube'

/**
 * Renders a YouTube-style video player component
 * @returns {JSX.Element} A div containing a video element with controls
 */
const YoutubePlayer = () => {
  return (
    <div className=''>
      <video src="/demo.mp4"   controls className='relative w-full aspect-video overflow-hidden rounded-xl'></video>
    </div>
  )
}

export default YoutubePlayer