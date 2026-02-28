import { useState, useEffect } from "react";

const defaultCategories = [
  "राजनीति",
    "प्रौद्योगिकी",
    "खेल",
    "व्यापार",
    "मनोरंजन",
    "स्वास्थ्य",
    "विश्व",
];

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
  const saved = JSON.parse(
    localStorage.getItem("adminCategories")
  );

  if (!saved || saved.length === 0) {
    const formatted = defaultCategories.map((cat) => ({
      id: Date.now() + Math.random(),
      name: cat,
    }));

    setCategories(formatted);
    localStorage.setItem(
      "adminCategories",
      JSON.stringify(formatted)
    );
  } else {
    setCategories(saved);
  }
}, []);

  useEffect(() => {
    localStorage.setItem(
      "adminCategories",
      JSON.stringify(categories)
    );
  }, [categories]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    // prevent duplicates
    if (
      categories.some(
        (c) => c.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      alert("Category already exists");
      return;
    }

    const categoryData = {
      id: editingId || Date.now(),
      name,
    };

    if (editingId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? categoryData : c))
      );
      setEditingId(null);
    } else {
      setCategories((prev) => [...prev, categoryData]);
    }

    setName("");
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditingId(cat.id);
  };

  const handleDelete = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
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
            key={cat.id}
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
                onClick={() => handleDelete(cat.id)}
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
