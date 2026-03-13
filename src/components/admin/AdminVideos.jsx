import { useState, useEffect } from "react";
import api from "../../assets/api";

const AdminVideos = () => {
  const [categories, setCategories] = useState([]);
  const [videos, setVideos] = useState([]);
  const [editingId, setEditingId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    videoUrl: "",
    status: "DRAFT"
  });

  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data.data || []);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const { data } = await api.get("/videos");
        setVideos(data.data || data || []);
      } catch (err) {
        console.error("Failed to fetch videos", err);
      }
    };
    fetchVideos();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.videoUrl || !formData.category) return;

    const multipartData = new FormData();
    multipartData.append("title", formData.title);
    multipartData.append("description", formData.description);
    multipartData.append("category", formData.category);
    multipartData.append("videoUrl", formData.videoUrl);
    multipartData.append("status", formData.status);
    
    if (thumbnail) {
      multipartData.append("thumbnail", thumbnail);
    }

    try {
      if (editingId) {
        const { data } = await api.patch(`/videos/${editingId}`, multipartData);
        setVideos((prev) =>
          prev.map((v) => (v.id === editingId || v._id === editingId ? data.data || data : v))
        );
        setEditingId(null);
      } else {
        const { data } = await api.post("/videos", multipartData);
        setVideos((prev) => [...prev, data.data || data]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save video");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "",
      videoUrl: "",
      status: "DRAFT"
    });
    setThumbnail(null);
    setThumbnailPreview(null);
  };

  const handleEdit = (video) => {
    setFormData({
      title: video.title || "",
      description: video.description || "",
      category: video.category?._id || video.category || "",
      videoUrl: video.videoUrl || "",
      status: video.status || "DRAFT"
    });
    setThumbnailPreview(video.thumbnail);
    setThumbnail(null);
    setEditingId(video._id || video.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this video?")) return;
    try {
      await api.delete(`/videos/${id}`);
      setVideos((prev) => prev.filter((v) => (v._id || v.id) !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete video");
    }
  };

  return (
    <div className="space-y-8">
      {/* Form Section */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? "Edit Video" : "Add Video News"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Video Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Description</label>
            <textarea
              name="description"
              rows="4"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Video URL */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">YouTube Video URL</label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              required
              placeholder="https://youtube.com/..."
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Thumbnail Upload */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Upload Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full"
            />
            {thumbnailPreview && (
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className="mt-3 w-48 rounded-md shadow-sm"
              />
            )}
          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            {editingId ? "Update Video News" : "Save Video News"}
          </button>
        </form>
      </div>

      {/* Videos List Section */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">All Videos</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">Thumbnail</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Video URL</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {videos.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No videos created yet.
                  </td>
                </tr>
              ) : (
                videos.map((video) => (
                  <tr key={video._id || video.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {video.thumbnail && (
                        <img
                          src={video.thumbnail}
                          alt="thumbnail"
                          className="w-16 h-12 rounded object-cover"
                        />
                      )}
                    </td>
                    <td className="p-3 font-medium">{video.title}</td>
                    <td className="p-3 text-gray-600">
                      {video.category?.name || video.category}
                    </td>
                    <td className="p-3">
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        video.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {video.status}
                      </span>
                    </td>
                    <td className="p-3 text-blue-600 hover:underline">
                      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">Link</a>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(video)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(video._id || video.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminVideos;
