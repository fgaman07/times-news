import React from 'react'
import { PlayCircle } from 'lucide-react'

const VideoSection = () => {
    const video = {
    title: "बड़ी खबर: आज की सबसे अहम वीडियो रिपोर्ट",
    time: "2 घंटे पहले",
    youtubeId: "dQw4w9WgXcQ"
  }
  return (
    <div className='bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden'>
        <div className='relative w-full h-full  transition hover:scale-105'>
            <iframe className="w-full rounded-t-xl" src={`https://www.youtube.com/embed/${video.youtubeId}`} title="Youtube Video" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
        </div>
        <div className='p-3 cursor-pointer'>
            <h3 className='font-semibold text-sm leading-snug'>
                {video.title}
            </h3>
            <p className='text-xs text-gray-500 mt-1'>{video.time}</p>
        </div>
    </div>
    
  )
}

export default VideoSection
