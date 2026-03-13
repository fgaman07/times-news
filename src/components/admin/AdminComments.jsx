import { useState, useEffect } from "react";
import api from "../../assets/api";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const { data } = await api.get("/comments");
        setComments(data);
      } catch (err) {
        console.error("Failed to parse comments", err);
      }
    };
    fetchComments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/comments/${id}`, { status });
      setComments((prev) =>
        prev.map((c) => ((c._id || c.id) === id ? { ...c, status } : c))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  const deleteComment = async (id) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      await api.delete(`/comments/${id}`);
      setComments((prev) => prev.filter((c) => (c._id || c.id) !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment");
    }
  };

  const filteredComments = comments.filter((c) => {
    const matchesFilter =
      filter === "All" || c.status === filter;
    const matchesSearch =
      c.user.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Manage Comments
        </h2>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search by user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded-md px-3 py-2 text-sm"
          >
            <option>All</option>
            <option>Approved</option>
            <option>Pending</option>
            <option>Rejected</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600 text-sm">
            <tr>
              <th className="p-4">User</th>
              <th>Comment</th>
              <th>Status</th>
              <th className="text-right p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredComments.map((comment) => (
              <tr
                key={comment._id || comment.id}
                className="border-t hover:bg-gray-50"
              >
                <td className="p-4 font-medium">
                  {comment.user}
                </td>

                <td className="max-w-xs truncate">
                  {comment.content}
                </td>

                <td>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      comment.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : comment.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {comment.status}
                  </span>
                </td>

                <td className="text-right p-4 space-x-3">
                  <button
                    onClick={() =>
                      updateStatus(comment._id || comment.id, "Approved")
                    }
                    className="text-green-600 hover:underline text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(comment._id || comment.id, "Rejected")
                    }
                    className="text-yellow-600 hover:underline text-sm"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      deleteComment(comment._id || comment.id)
                    }
                    className="text-red-600 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredComments.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="text-center p-6 text-gray-500"
                >
                  No comments found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminComments;
