import { useState, useEffect } from "react";

const AdminComments = () => {
  const [comments, setComments] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
  const savedComments = JSON.parse(localStorage.getItem("comments"));
  if (savedComments) {
    setComments(savedComments);
  }
}, []);


  useEffect(() => {
    localStorage.setItem("adminComments", JSON.stringify(comments));
  }, [comments]);

  const updateStatus = (id, status) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status } : c
      )
    );
  };

  const deleteComment = (id) => {
    setComments((prev) =>
      prev.filter((c) => c.id !== id)
    );
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
                key={comment.id}
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
                      updateStatus(comment.id, "Approved")
                    }
                    className="text-green-600 hover:underline text-sm"
                  >
                    Approve
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(comment.id, "Rejected")
                    }
                    className="text-yellow-600 hover:underline text-sm"
                  >
                    Reject
                  </button>

                  <button
                    onClick={() =>
                      deleteComment(comment.id)
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
