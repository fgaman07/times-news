import React from 'react'
import VideoSection from './VideoSection'

const RightSidebar = () => {
  return (
    <div className='space-y-6'>
        <div className=''>
            <VideoSection />
        </div>
        <div className="bg-linear-to-r from-red-600 to-red-500 text-white rounded-lg p-4 shadow-md">
                  <h3 className="text-lg font-semibold mb-2">🌦️ मौसम अपडेट</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">27°C</p>
                      <p className="text-sm opacity-90">दिल्ली • हल्की धूप</p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold">AQI: <span className="text-yellow-300">162</span></p>
                      <p className="text-xs opacity-80">मध्यम</p>
                    </div>
                  </div>
                </div>
                {/* Quote of the Day */}
                <div className="bg-gray-100 border-l-4 border-red-600 p-4 rounded">
                  <h3 className="text-lg font-semibold mb-2">📝 विचार</h3>
                  <p className="text-gray-700 text-sm italic">
                    "सफलता उन्हीं को मिलती है जो समय का सम्मान करते हैं।"
                  </p>
                </div>
    </div>
  )
}

export default RightSidebar
