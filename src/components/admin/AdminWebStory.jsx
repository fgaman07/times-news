import { useState, useEffect } from "react";
import api from "../../assets/api";

const AdminWebStories = () => {
  const [categories, setCategories] = useState([]);
  const [stories, setStories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "DRAFT"
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

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
    const fetchStories = async () => {
      try {
        const { data } = await api.get("/webstories");
        setStories(data.data || data || []);
      } catch (err) {
        console.error("Failed to fetch web stories", err);
      }
    };
    fetchStories();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.category) return;

    const multipartData = new FormData();
    multipartData.append("title", formData.title);
    multipartData.append("category", formData.category);
    multipartData.append("status", formData.status);
    
    if (image) {
      multipartData.append("image", image);
    }

    try {
      if (editingId) {
        const { data } = await api.patch(`/webstories/${editingId}`, multipartData);
        setStories((prev) =>
          prev.map((story) =>
            story.id === editingId || story._id === editingId ? data.data || data : story
          )
        );
        setEditingId(null);
      } else {
        const { data } = await api.post("/webstories", multipartData);
        setStories((prev) => [...prev, data.data || data]);
      }
      resetForm();
    } catch (err) {
      console.error(err);
      alert("Failed to save web story");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      status: "DRAFT"
    });
    setImage(null);
    setPreview(null);
  };

  const handleEdit = (story) => {
    setFormData({
      title: story.title || "",
      category: story.category?._id || story.category || "",
      status: story.status || "DRAFT"
    });
    setPreview(story.image || story.preview);
    setImage(null);
    setEditingId(story._id || story.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await api.delete(`/webstories/${id}`);
      setStories((prev) => prev.filter((story) => (story._id || story.id) !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete web story");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">

      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          {editingId ? "Edit Web Story" : "Web Stories Management"}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Add, edit and manage web stories.
        </p>
      </div>

      {/* FORM SECTION */}
      <form onSubmit={handleSubmit} className="space-y-6 mb-10">

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Story Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter story title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id || cat.id} value={cat._id || cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full text-sm"
            />
          </div>
        </div>

        {preview && (
          <div>
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md border"
            />
          </div>
        )}

        <div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded-md transition"
          >
            {editingId ? "Update Story" : "Add Story"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="ml-3 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium px-5 py-2 rounded-md transition"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* TABLE SECTION */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          All Web Stories
        </h3>

        <div className="overflow-x-auto border border-gray-200 rounded-md">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-600">Image</th>
                <th className="px-4 py-3 font-medium text-gray-600">Title</th>
                <th className="px-4 py-3 font-medium text-gray-600">Category</th>
                <th className="px-4 py-3 font-medium text-gray-600">Status</th>
                <th className="px-4 py-3 font-medium text-gray-600">Date</th>
                <th className="px-4 py-3 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>

            <tbody>
              {stories.map((story) => (
                <tr key={story._id || story.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {(story.image || story.preview) && (
                      <img
                        src={story.image || story.preview}
                        alt={story.title}
                        className="w-14 h-14 object-cover rounded"
                      />
                    )}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    {story.title}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {story.category?.name || story.category}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        story.status === "PUBLISHED"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {story.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {new Date(story.createdAt || story.date || Date.now()).toLocaleDateString()}
                  </td>

                  <td className="px-4 py-3 space-x-3">
                    <button
                      onClick={() => handleEdit(story)}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(story._id || story.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {stories.length === 0 && (
          <p className="text-gray-500 text-sm mt-4 text-center">
            No web stories found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminWebStories;
