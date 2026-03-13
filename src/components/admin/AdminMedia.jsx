import { useState, useEffect } from "react";
import api from "../../assets/api";

const AdminMedia = () => {
  const [media, setMedia] = useState([]);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const { data } = await api.get("/media");
        setMedia(data);
      } catch (err) {
        console.error("Failed to load media", err);
      }
    };
    fetchMedia();
  }, []);

  const handleUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = async () => {
      try {
        const { data } = await api.post("/media", {
          name: file.name,
          url: reader.result,
        });
        setMedia((prev) => [...prev, data]);
        setPreview(null);
      } catch (err) {
        console.error(err);
        alert("Failed to upload media");
      }
    };
    reader.readAsDataURL(file);
  };

  const deleteMedia = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await api.delete(`/media/${id}`);
      setMedia((prev) => prev.filter((m) => (m._id || m.id) !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete media");
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">
        Media Library
      </h2>

      {/* Upload Box */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-white">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setPreview(URL.createObjectURL(file));
            }
          }}
          className="hidden"
          id="mediaUpload"
        />

        <label
          htmlFor="mediaUpload"
          className="cursor-pointer text-gray-600"
        >
          Click to upload image
        </label>

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="mx-auto w-40 h-40 object-cover rounded-lg shadow"
            />

            <button
              onClick={() =>
                handleUpload(
                  document.getElementById("mediaUpload")
                    .files[0]
                )
              }
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700"
            >
              Confirm Upload
            </button>
          </div>
        )}
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-4 gap-6">
        {media.map((item) => (
          <div
            key={item._id || item.id}
            className="relative group bg-white rounded-lg overflow-hidden shadow"
          >
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-40 object-cover"
            />

            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
              <button
                onClick={() => deleteMedia(item._id || item.id)}
                className="bg-red-600 text-white px-4 py-1 rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {media.length === 0 && (
          <p className="text-gray-500 col-span-4">
            No media uploaded yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminMedia;
