import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, ChevronRight } from 'lucide-react';
import api from '../assets/api';

const RightSidebar = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await api.get('/videos?status=PUBLISHED');
        // 🚀 THE FIX: res.data.data ki jagah res.data.data.videos
        setVideos(res.data?.data?.videos?.slice(0, 5) || []);
      } catch (error) {
        console.error("Failed to fetch sidebar videos", error);
      }
    };
    fetchVideos();
  }, []);

  const getEmbedUrl = (url) => {
    const m = url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return m && m[2].length === 11 ? `https://www.youtube.com/embed/${m[2]}` : url;
  };
  const getThumbUrl = (url) => {
    const m = url?.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
    return m && m[2].length === 11 ? `https://img.youtube.com/vi/${m[2]}/mqdefault.jpg` : null;
  };

  return (
    <div className='space-y-5'>

      {/* Video Widget */}
      {videos.length > 0 && (
        <div className="bg-white border border-gray-200 rounded overflow-hidden">
          <div className="flex items-center justify-between bg-red-600 text-white px-4 py-2.5">
            <h3 className="text-sm font-bold flex items-center gap-1.5">
              <Play size={14} fill="white" /> वीडियो
            </h3>
            <button onClick={() => navigate('/videos')}
              className="text-xs font-bold hover:underline flex items-center">
              और देखें <ChevronRight size={14} />
            </button>
          </div>

          <div className="aspect-video bg-black">
            <iframe className="w-full h-full" src={getEmbedUrl(videos[0].videoUrl)}
              title={videos[0].title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen />
          </div>
          <div className="p-3 border-b border-gray-100">
            <h4 className="font-bold text-sm text-gray-900 line-clamp-2 leading-snug">{videos[0].title}</h4>
            <span className="text-xs font-bold text-red-600 uppercase mt-1 inline-block">{videos[0].category?.name}</span>
          </div>

          {videos.slice(1).map(video => {
            const thumb = video.thumbnail || getThumbUrl(video.videoUrl);
            return (
              <div key={video._id} className="flex gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                <div className="relative w-24 h-16 rounded overflow-hidden flex-shrink-0 bg-gray-100">
                  {thumb && <img src={thumb} alt="" className="w-full h-full object-cover" />}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play size={16} className="text-white" fill="white" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-snug">{video.title}</h5>
                  <span className="text-xs font-bold text-red-600 uppercase mt-1 inline-block">{video.category?.name}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Weather */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <div className="bg-red-600 text-white px-4 py-2.5">
          <h3 className="text-lg font-bold">मौसम अपडेट</h3>
        </div>
        <div className="p-4 flex items-center justify-between">
          <div>
            <p className="text-3xl font-bold text-gray-900">27°C</p>
            <p className="text-sm text-gray-500 mt-1">दिल्ली • हल्की धूप</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-700">AQI: <span className="text-orange-500 font-bold">162</span></p>
            <p className="text-xs text-gray-400">मध्यम</p>
          </div>
        </div>
      </div>

      {/* Ad Space */}
      <div className="bg-gray-50 border border-gray-200 rounded p-5 text-center">
        <span className="text-xs text-gray-400 uppercase tracking-wider">विज्ञापन</span>
        <div className="h-40"></div>
      </div>

      {/* Quote */}
      <div className="bg-white border border-gray-200 rounded overflow-hidden">
        <div className="bg-orange-500 text-white px-4 py-2.5">
          <h3 className="text-lg font-bold">आज का विचार</h3>
        </div>
        <div className="p-4">
          <p className="text-gray-600 text-base italic leading-relaxed">
            "सफलता उन्हीं को मिलती है जो समय का सम्मान करते हैं।"
          </p>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
