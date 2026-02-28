import React, { useState } from "react";

const categories = [
  "राजनीति",
  "प्रौद्योगिकी",
  "खेल",
  "व्यापार",
  "मनोरंजन",
  "स्वास्थ्य",
  "विश्व",
];

const AdminVideos = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    videoUrl: "",
    thumbnail: null,
    published: false,
  });

  const [thumbnailPreview, setThumbnailPreview] = useState(null);

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
      setFormData((prev) => ({ ...prev, thumbnail: file }));
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Video Submitted:", formData);
    // Connect API here
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Add Video News
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Title */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Video Title
          </label>
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
          <label className="block font-semibold mb-2 text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Video URL */}
        <div>
          <label className="block font-semibold mb-2 text-gray-700">
            YouTube Video URL
          </label>
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
          <label className="block font-semibold mb-2 text-gray-700">
            Upload Thumbnail
          </label>
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

        {/* Publish Toggle */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="published"
            checked={formData.published}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded"
          />
          <label className="text-gray-700 font-medium">
            Publish Immediately
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
        >
          Save Video News
        </button>

      </form>
    </div>
  );
};

export default AdminVideos;
