import { useState, useEffect } from "react";

const AdminNews = () => {
  const [categories, setCategories] = useState([]);

useEffect(() => {
  const saved =
    JSON.parse(localStorage.getItem("adminCategories")) || [];
  setCategories(saved);
}, []);

  const [articles, setArticles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    status: "Draft",
    image: null,
  });

  /* Load from localStorage */
  useEffect(() => {
    const saved = localStorage.getItem("adminArticles");
    if (saved) setArticles(JSON.parse(saved));
  }, []);

  /* Save to localStorage */
  useEffect(() => {
    localStorage.setItem("adminArticles", JSON.stringify(articles));
  }, [articles]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setFormData((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category || !formData.content)
      return;

    const articleData = {
      id: editingId || Date.now(),
      ...formData,
      createdAt: new Date().toLocaleDateString(),
    };

    if (editingId) {
      setArticles((prev) =>
        prev.map((a) => (a.id === editingId ? articleData : a))
      );
      setEditingId(null);
    } else {
      setArticles((prev) => [...prev, articleData]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      category: "",
      status: "Draft",
      image: null,
    });
    setImagePreview(null);
  };

  const handleEdit = (article) => {
    setFormData(article);
    setImagePreview(article.image);
    setEditingId(article.id);
  };

  const handleDelete = (id) => {
    setArticles((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-8">

      {/* FORM CARD — identical structure */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {editingId ? "Edit Article" : "Add News Article"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Article Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Article Content
            </label>
            <textarea
              name="content"
              rows="6"
              value={formData.content}
              onChange={handleChange}
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
  className="border p-2 rounded w-full"
>
  <option value="">Select Category</option>
  {categories.map((cat) => (
    <option key={cat.id} value={cat.name}>
      {cat.name}
    </option>
  ))}
</select>

          </div>

          {/* Status */}
          <div>
            <label className="block font-semibold mb-2 text-gray-700">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          {/* Image Upload */}
          {/* Image Upload */}
<div>
  <label className="block font-semibold mb-2 text-gray-700">
    Upload Featured Image
  </label>

  <div className="flex items-center justify-center w-full">
    <label className="w-full cursor-pointer">
      <div className="
        flex flex-col items-center justify-center
        w-full h-40
        border-2 border-dashed border-gray-300
        rounded-lg
        bg-gray-50
        hover:bg-gray-100
        transition duration-200
      ">
        <svg
          className="w-10 h-10 text-gray-400 mb-2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5V19a2 2 0 002 2h14a2 2 0 002-2v-2.5M7 10l5-5m0 0l5 5m-5-5v12"
          />
        </svg>

        <p className="text-sm text-gray-500">
          Click to upload image
        </p>
        <p className="text-xs text-gray-400 mt-1">
          PNG, JPG up to 5MB
        </p>
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
    </label>
  </div>

  {imagePreview && (
    <div className="mt-4">
      <p className="text-sm font-medium text-gray-600 mb-2">
        Preview:
      </p>
      <img
        src={imagePreview}
        alt="Preview"
        className="w-56 rounded-lg shadow-md object-cover"
      />
    </div>
  )}
</div>


          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            {editingId ? "Update Article" : "Save Article"}
          </button>

        </form>
      </div>

      {/* TABLE CARD */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-lg font-semibold mb-4">
          All Articles
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Category</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {articles.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-6 text-gray-500">
                    No articles created yet.
                  </td>
                </tr>
              ) : (
                articles.map((article) => (
                  <tr key={article.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">
                      {article.image && (
                        <img
                          src={article.image}
                          alt=""
                          className="w-14 h-14 rounded object-cover"
                        />
                      )}
                    </td>

                    <td className="p-3 font-medium">
                      {article.title}
                    </td>

                    <td className="p-3 text-gray-600">
                      {article.category}
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 text-sm rounded-full ${
                          article.status === "Published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {article.status}
                      </span>
                    </td>

                    <td className="p-3 text-gray-500">
                      {article.createdAt}
                    </td>

                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => handleEdit(article)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(article.id)}
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

export default AdminNews;
