import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    news: 0,
    videos: 0,
    webstories: 0,
    users: 0,
  });

  const [recentNews, setRecentNews] = useState([]);
  const currentUser = JSON.parse(
    localStorage.getItem("currentUser")
  );

  useEffect(() => {
    const news =
      JSON.parse(localStorage.getItem("adminNews")) || [];
    const videos =
      JSON.parse(localStorage.getItem("adminVideos")) || [];
    const webstories =
      JSON.parse(localStorage.getItem("adminWebstories")) || [];
    const users =
      JSON.parse(localStorage.getItem("users")) || [];

    setStats({
      news: news.length,
      videos: videos.length,
      webstories: webstories.length,
      users: users.length,
    });

    setRecentNews(news.slice(-5).reverse());
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome, {currentUser?.name}
        </h1>
        <p className="text-gray-500">
          {new Date().toDateString()}
        </p>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-4 gap-6">
        <StatCard title="Total News" value={stats.news} />
        <StatCard title="Videos" value={stats.videos} />
        <StatCard title="Web Stories" value={stats.webstories} />
        <StatCard title="Users" value={stats.users} />
      </div>

      {/* Recent News Table */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">
          Recent News
        </h2>

        <table className="w-full text-left">
          <thead>
            <tr className="border-b text-gray-600 text-sm">
              <th className="py-2">Title</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentNews.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50"
              >
                <td className="py-2">{item.title}</td>
                <td>{item.category}</td>
                <td>
                  <span className="text-green-600 text-sm">
                    Published
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {recentNews.length === 0 && (
          <p className="text-gray-500 text-sm">
            No recent articles available.
          </p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
    <p className="text-gray-500 text-sm">{title}</p>
    <h2 className="text-3xl font-bold mt-2">{value}</h2>
  </div>
);

export default AdminDashboard;
