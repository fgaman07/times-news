import { useEffect, useState } from "react";
import api from "../../assets/api";
import { useUser } from "./UserContext";
import {
  Newspaper,
  Video,
  BookOpen,
  Users,
  TrendingUp,
  MoreVertical,
  MousePointerClick,
  Plus
} from "lucide-react";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    news: 0,
    videos: 0,
    webstories: 0,
    users: 0,
  });

  const [recentNews, setRecentNews] = useState([]);
  const { currentUser } = useUser();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [newsRes, videosRes, storiesRes, usersRes] = await Promise.all([
          api.get('/articles').catch(() => ({ data: { data: { articles: [] } } })),
          api.get('/videos').catch(() => ({ data: { data: [] } })),
          api.get('/webstories').catch(() => ({ data: { data: [] } })),
          api.get('/users/admin/all-users').catch(() => ({ data: { data: [] } }))
        ]);

        const news = newsRes.data?.data?.articles || [];
        const videos = videosRes.data?.data || [];
        const webstories = storiesRes.data?.data || [];
        let users = usersRes.data?.data || [];
        if (!Array.isArray(users)) users = usersRes.data || [];

        setStats({
          news: news.length,
          videos: videos.length,
          webstories: webstories.length,
          users: users.length,
        });

        setRecentNews(news.slice(-5).reverse());
      } catch (err) {
        console.error("Failed to fetch dashboard stats", err);
      }
    };
    fetchDashboardData();
  }, []);

  const statCards = [
    { title: "Total Articles", value: stats.news, icon: Newspaper, color: "text-blue-600", bg: "bg-blue-50", trend: "+12%" },
    { title: "Video Content", value: stats.videos, icon: Video, color: "text-purple-600", bg: "bg-purple-50", trend: "+4%" },
    { title: "Web Stories", value: stats.webstories, icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", trend: "+23%" },
    { title: "Active Users", value: stats.users, icon: Users, color: "text-orange-600", bg: "bg-orange-50", trend: "+2%" }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Dashboard
          </h1>
          <p className="text-slate-500 mt-1 font-medium text-sm">
            Overview of your system metrics and recent activities
          </p>
        </div>
        {/* <div className="flex gap-3">
          <button className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 font-semibold transition-colors shadow-sm text-sm">
            Generate Report
          </button>
          <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-200 font-semibold transition-colors text-sm flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Post</span>
          </button>
        </div> */}
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 hover:shadow-md transition-all group">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">{card.title}</p>
                  <h2 className="text-3xl font-bold text-slate-900">{card.value}</h2>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} ${card.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm font-semibold text-emerald-600">
                <TrendingUp className="w-4 h-4 mr-1.5" />
                <span>{card.trend}</span>
                <span className="text-slate-400 font-medium ml-2">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent News Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-bold text-slate-900">
            Recent Articles
          </h2>
          <button className="text-blue-600 text-sm font-semibold hover:text-blue-700 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors shrink-0">
            View All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-xs uppercase tracking-wider font-bold border-b border-slate-200">
                <th className="py-4 px-6">Article Title</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentNews.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center text-slate-400">
                      <Newspaper className="w-8 h-8 mb-3 opacity-50" />
                      <p className="text-sm font-medium">No recent articles available.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                recentNews.map((item) => (
                  <tr key={item._id || item.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="py-4 px-6">
                      <span className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1">{item.title}</span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center text-sm font-medium text-slate-600">
                        {item.category?.name || item.category || 'Uncategorized'}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${item.status === 'PUBLISHED'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-amber-100 text-amber-700'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${item.status === 'PUBLISHED' ? 'bg-emerald-600' : 'bg-amber-600'}`}></span>
                        {item.status || "DRAFT"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-500 font-medium">
                      {new Date(item.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-5 h-5" />
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

export default AdminDashboard;
