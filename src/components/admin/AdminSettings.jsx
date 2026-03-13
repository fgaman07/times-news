import { useState, useEffect } from "react";
import api from "../../assets/api";

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    siteName: "Times News",
    contactEmail: "admin@timesnews.com",
    seoDescription: "The latest news and updates.",
    facebookUrl: "https://facebook.com",
    twitterUrl: "https://twitter.com",
    maintenanceMode: false,
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data } = await api.get("/settings");
        if (data && Object.keys(data).length > 0) {
          setSettings(data);
        }
      } catch (err) {
        console.error("Failed to load settings or endpoint not available yet", err);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    try {
      await api.post("/settings", settings);
      setSuccessMsg("Settings updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update settings. Please check server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">Website Settings</h1>

      {successMsg && (
        <div className="bg-green-100 text-green-700 p-3 rounded mb-4">
          {successMsg}
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Site Name</label>
          <input
            type="text"
            name="siteName"
            value={settings.siteName}
            onChange={handleChange}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">Contact Email</label>
          <input
            type="email"
            name="contactEmail"
            value={settings.contactEmail}
            onChange={handleChange}
            className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">SEO Description</label>
          <textarea
            name="seoDescription"
            value={settings.seoDescription}
            onChange={handleChange}
            className="w-full border p-3 rounded-md h-24 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Facebook URL</label>
            <input
              type="url"
              name="facebookUrl"
              value={settings.facebookUrl}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Twitter URL</label>
            <input
              type="url"
              name="twitterUrl"
              value={settings.twitterUrl}
              onChange={handleChange}
              className="w-full border p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 mt-4">
          <input
            type="checkbox"
            name="maintenanceMode"
            id="maintenanceMode"
            checked={settings.maintenanceMode}
            onChange={handleChange}
            className="w-5 h-5 text-blue-600 focus:ring-blue-500 rounded"
          />
          <label htmlFor="maintenanceMode" className="text-gray-700 font-medium cursor-pointer">
            Enable Maintenance Mode
          </label>
        </div>

        <div className="pt-4 border-t">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Saving..." : "Save Settings"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
