import React from 'react'
import { useState, useEffect } from 'react';
import { TrendingUp } from 'lucide-react';
import { useNavigate, useParams } from "react-router-dom"

const NewsSection = () => {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const [news, setNews] = useState([]);
  const [current, setCurrent] = useState(0);
  const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

  const categoryMap = {
  "देश": "india",
  "विदेश": "world",
  "राज्य": "india state",
  "शहर": "city",
  "मनोरंजन": "entertainment",
  "क्रिकेट": "cricket",
  "टेक्नोलॉजी": "technology",
  "फोटोज़": "photos"
};

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const query = categoryName
          ? categoryMap[decodeURIComponent(categoryName)] || "india"
          : "india";

        const res = await fetch(
          `https://newsapi.org/v2/everything?q=${query}&language=hi&apiKey=${API_KEY}`
        );

        const data = await res.json();
        setNews(data.articles || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, [categoryName]);

  const trending = news.slice(0, 5);
  const latest = news.slice(5, 13);

  useEffect(() => {
    if (trending.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % trending.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [trending.length]);

  return (
     <div className="space-y-6">
      {/* 🔥 Trending Section */}
       {trending.length > 0 && (
        <div className="flex items-center gap-4 bg-red-50 border border-red-200 rounded-lg p-3 overflow-hidden">
          <div className="flex items-center gap-1 text-red-600 font-bold">
            <TrendingUp size={18} />
            <span>Trending</span>
          </div>

          <div className="relative h-6 overflow-hidden flex-1">
            <div
              className="absolute transition-transform duration-500"
              style={{
                transform: `translateY(-${current * 24}px)`,
              }}
            >
              {trending.map((item, index) => (
                <div
                  key={index}
                  className="h-6 text-sm font-medium text-gray-800 whitespace-nowrap truncate"
                >
                  {item.title}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 📰 Main News List */}
      <div className="space-y-4">
        {latest.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(`/news/${index}`, { state: item })}
            className="flex gap-4 bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
          >
            {item.urlToImage && (
              <img
                src={item.urlToImage}
                alt={item.title}
                className="w-40 h-28 object-cover rounded-md"
              />
            )}

            <div>
              <h2 className="font-bold text-base">{item.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-2 mt-2" dangerouslySetInnerHTML={{ __html: item.description || '' }}></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsSection
