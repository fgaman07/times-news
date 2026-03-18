import React, { useState, useEffect } from "react";
import api from "../assets/api";
import { BookOpen } from "lucide-react";

const WebStoryPage = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await api.get('/webstories?status=PUBLISHED');
        setStories(res.data?.data || []);
      } catch (err) {
        console.error("Failed to fetch web stories", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 min-h-screen">
      <div className="flex items-center gap-3 mb-6">
         <BookOpen className="w-8 h-8 text-orange-600" />
         <h1 className="text-2xl md:text-3xl font-bold text-gray-900">वेब स्टोरीज़</h1>
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
        </div>
      ) : stories.length === 0 ? (
         <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600">कोई वेब स्टोरी नहीं मिली</h2>
            <p className="text-gray-500 mt-2">जल्द ही नई स्टोरीज़ अपलोड की जाएंगी।</p>
         </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {stories.map(story => (
            <div key={story._id} className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all aspect-[9/16] cursor-pointer">
               <img src={story.image} alt={story.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                  <span className="bg-orange-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded inline-block mb-2 w-max">
                     {story.category?.name || "Story"}
                  </span>
                  <h3 className="text-white font-bold text-sm md:text-base leading-snug line-clamp-3">
                     {story.title}
                  </h3>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WebStoryPage;
