import { useState } from "react";

const AdminWebStories = () => {
  const [stories, setStories] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    status: "Draft",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title) return;

    if (editingId) {
      setStories(
        stories.map((story) =>
          story.id === editingId
            ? { ...story, ...formData, preview }
            : story
        )
      );
      setEditingId(null);
    } else {
      const newStory = {
        id: Date.now(),
        ...formData,
        preview,
        date: new Date().toLocaleDateString(),
      };

      setStories([...stories, newStory]);
    }

    setFormData({
      title: "",
      category: "",
      status: "Draft",
      image: null,
    });
    setPreview(null);
  };

  const handleEdit = (story) => {
    setFormData(story);
    setPreview(story.preview);
    setEditingId(story.id);
  };

  const handleDelete = (id) => {
    setStories(stories.filter((story) => story.id !== id));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">

      {/* Header */}
      <div className="border-b pb-4 mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">
          Web Stories Management
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
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter category"
            />
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
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Image
            </label>
            <input
              type="file"
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
                <tr key={story.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">
                    {story.preview && (
                      <img
                        src={story.preview}
                        alt={story.title}
                        className="w-14 h-14 object-cover rounded"
                      />
                    )}
                  </td>

                  <td className="px-4 py-3 font-medium text-gray-800">
                    {story.title}
                  </td>

                  <td className="px-4 py-3 text-gray-600">
                    {story.category}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        story.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {story.status}
                    </span>
                  </td>

                  <td className="px-4 py-3 text-gray-500">
                    {story.date}
                  </td>

                  <td className="px-4 py-3 space-x-3">
                    <button
                      onClick={() => handleEdit(story)}
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(story.id)}
                      className="text-red-600 hover:text-red-800 text-sm"
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
          <p className="text-gray-500 text-sm mt-4">
            No web stories found.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminWebStories;
