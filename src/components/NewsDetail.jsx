import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const NewsDetail = () => {
    const {state} = useLocation();
    const navigate = useNavigate();
    if(!state) {
        return <div className='p-4'>Article not found</div>
    }
  return (
    <div className='max-w-4xl mx-auto p-4'>
      <button
      onClick={() => navigate(-1)} className='mb-4 text-orange-500 font-semibold'>
        ← Back
      </button>
      {state.urlToImage && (
        <img
          src={state.urlToImage}
          alt={state.title}
          className="w-full h-80 object-cover rounded-lg mb-4"
        />
      )}

      <h1 className="text-2xl font-bold mb-2">{state.title}</h1>
      <p className="text-gray-600 mb-4">{state.source?.name}</p>

      <p className="text-base leading-relaxed">
        {state.content || state.description}
      </p>

      {state.url && (
        <a
          href={state.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 text-orange-500 font-semibold"
        >
          Read original source →
        </a>
      )}
    </div>
  )
}

export default NewsDetail
