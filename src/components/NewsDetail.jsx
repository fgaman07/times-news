import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import api from '../assets/api';
import { useUser } from './admin/UserContext';

const NewsDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const { state } = useLocation();
    
    // Fall back to state if arriving from the external newsapi feed
    const [article, setArticle] = useState(state || null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(!state);

    useEffect(() => {
      // Fetch only if not provided via React Router State
      if (!state) {
        const fetchArticle = async () => {
          try {
            const { data } = await api.get(`/articles/${slug}`);
            setArticle(data.data);
            
            if(data.data?._id) {
               const commentsRes = await api.get(`/comments/${data.data._id}`);
               setComments(commentsRes.data.data || []);
            }
          } catch(err) {
            console.error("Failed to fetch article", err);
          } finally {
            setLoading(false);
          }
        };
        if (slug) fetchArticle();
      }
    }, [slug, state]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const { data } = await api.post(`/comments/${article._id}`, { content: newComment });
            setComments(prev => [data.data, ...prev]);
            setNewComment("");
        } catch (err) {
            console.error("Failed to post comment", err);
            if (err.response?.status === 401) {
                alert("Please login to comment.");
                navigate('/login');
            } else {
                alert("Failed to submit comment.");
            }
        }
    };

    if (loading) return <div className='p-4 text-center mt-10'>Loading article...</div>;
    if (!article) return <div className='p-4 text-center mt-10'>Article not found</div>;

    const isExternal = !article._id; // Does it lack our backend ID?

    return (
        <div className='max-w-4xl mx-auto p-4 mb-20'>
            <button onClick={() => navigate(-1)} className='mb-4 text-red-600 font-semibold hover:underline'>
                &larr; Back
            </button>
            
            {(article.thumbnail || article.image || article.urlToImage) && (
                <img
                    src={article.thumbnail || article.image || article.urlToImage}
                    alt={article.title}
                    className="w-full h-80 object-cover rounded-lg mb-6 shadow-md"
                />
            )}

            <h1 className="text-3xl font-bold mb-3">{article.title}</h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-6 border-b">
                <span>By: {article.author?.fullName || (typeof article.author === 'string' ? article.author : 'Anonymous')}</span>
                <span>•</span>
                <span>{new Date(article.createdAt || article.publishedAt || Date.now()).toLocaleDateString()}</span>
                {article.views !== undefined && (
                    <>
                        <span>•</span>
                        <span>{article.views} Views</span>
                    </>
                )}
            </div>

            <div 
              className="text-lg leading-relaxed text-gray-800 mb-10 prose prose-red max-w-none" 
              dangerouslySetInnerHTML={{ __html: article.content || article.description }}>
            </div>

            {isExternal && article.url && (
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-6 text-red-600 font-semibold hover:underline"
                >
                  Read original source →
                </a>
            )}

            {/* Comments Section (Only for internally stored articles) */}
            {!isExternal && (
                <div className="mt-10 pt-8 border-t">
                    <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>
                    
                    {currentUser ? (
                        <form onSubmit={handleCommentSubmit} className="mb-8 bg-gray-50 p-4 rounded-lg">
                            <textarea
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Add a comment..."
                                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 min-h-[100px]"
                                required
                            />
                            <div className="flex justify-end mt-3">
                                <button type="submit" className="bg-red-600 text-white px-6 py-2 rounded-md font-medium hover:bg-red-700 transition">
                                    Post Comment
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="mb-8 p-4 bg-gray-100 rounded-lg text-center">
                            <p className="text-gray-600 mb-3">You must be logged in to post a comment.</p>
                            <button onClick={() => navigate('/login')} className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-black transition">
                                Login Now
                            </button>
                        </div>
                    )}

                    <div className="space-y-6">
                        {comments.length === 0 ? (
                            <p className="text-gray-500 italic">No comments yet. Be the first to share your thoughts!</p>
                        ) : (
                            comments.map((comment, idx) => (
                                <div key={comment._id || idx} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 shrink-0">
                                        {comment.author?.fullName?.charAt(0) || 'U'}
                                    </div>
                                    <div>
                                        <div className="bg-gray-50 px-4 py-3 rounded-2xl rounded-tl-sm">
                                            <div className="flex items-baseline gap-2 mb-1">
                                                <span className="font-semibold text-sm">{comment.author?.fullName || 'User'}</span>
                                                <span className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-800">{comment.content}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default NewsDetail;
