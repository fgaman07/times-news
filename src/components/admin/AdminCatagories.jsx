import { useState, useEffect } from "react";
import api from "../../assets/api";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // prevent duplicates
    if (
      categories.some(
        (c) => c.name.toLowerCase() === name.trim().toLowerCase()
      )
    ) {
      alert("Category already exists");
      return;
    }

    try {
      if (editingId) {
        const { data } = await api.put(`/categories/${editingId}`, { name: name.trim() });
        setCategories((prev) =>
          prev.map((c) => (c._id === editingId || c.id === editingId ? data : c))
        );
        setEditingId(null);
      } else {
        const { data } = await api.post("/categories", { name: name.trim() });
        setCategories((prev) => [...prev, data]);
      }
      setName("");
    } catch (err) {
      console.error(err);
      alert("Failed to save category");
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditingId(cat._id || cat.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await api.delete(`/categories/${id}`);
      setCategories((prev) => prev.filter((c) => (c._id || c.id) !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md space-y-6">
      <h1 className="text-2xl font-bold">Categories</h1>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category Name"
          className="flex-1 border p-3 rounded-md"
        />

        <button className="bg-blue-600 text-white px-6 rounded-md">
          {editingId ? "Update" : "Add"}
        </button>
      </form>

      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat._id || cat.id}
            className="flex justify-between bg-gray-100 p-3 rounded-md"
          >
            {cat.name}

            <div className="space-x-3">
              <button
                onClick={() => handleEdit(cat)}
                className="text-yellow-600"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(cat._id || cat.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminCategories;
