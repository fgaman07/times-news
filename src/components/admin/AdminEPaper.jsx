import { useState, useEffect } from "react";
import api from "../../assets/api";
import { 
  Plus, 
  Trash2, 
  FileText, 
  X, 
  Calendar, 
  CheckCircle2, 
  Upload, 
  Image as ImageIcon,
  Loader2,
  Newspaper
} from "lucide-react";

const AdminEPaper = () => {
  const [editions, setEditions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    date: new Date().toISOString().split('T')[0],
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    fetchEditions();
  }, []);

  const fetchEditions = async () => {
    try {
      setLoading(true);
      const { data } = await api.get("/epaper");
      setEditions(data.data || []);
    } catch (err) {
      console.error("Failed to fetch editions", err);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setSelectedFiles(files);
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setPreviews(newPreviews);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date || selectedFiles.length === 0) {
      alert("Please fill all fields and select at least one page.");
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("date", formData.date);
    selectedFiles.forEach((file) => {
      data.append("pages", file);
    });

    try {
      setUploading(true);
      await api.post("/epaper", data, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      alert("E-Paper uploaded successfully!");
      fetchEditions();
      resetForm();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to upload E-Paper");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this edition?")) return;
    try {
      await api.delete(`/epaper/${id}`);
      setEditions(prev => prev.filter(ed => ed._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete edition");
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      date: new Date().toISOString().split('T')[0],
    });
    setSelectedFiles([]);
    setPreviews([]);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">E-Paper Editions</h1>
          <p className="text-sm font-medium text-slate-500 mt-1">Manage daily newspaper uploads and archives</p>
        </div>
        {!showForm && (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm shadow-red-200 active:scale-[0.98] text-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Edition</span>
          </button>
        )}
      </div>

      {showForm ? (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-white">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Newspaper className="w-5 h-5 text-red-600" />
              </div>
              New E-Paper Edition
            </h2>
            <button 
              onClick={resetForm} 
              className="text-slate-400 hover:text-slate-700 hover:bg-slate-100 p-2 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              
              <div className="lg:col-span-1 space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Edition Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    placeholder="E.g. Sunday Edition"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all text-slate-900 text-sm font-semibold"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Publication Date *</label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-red-500/10 focus:border-red-500 outline-none transition-all text-slate-900 text-sm font-semibold"
                      required
                    />
                  </div>
                </div>
              </div>
              
              <div className="lg:col-span-2 space-y-4">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Upload Page Images *</label>
                
                <label className="relative flex flex-col items-center justify-center w-full min-h-[200px] border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-red-400 transition-all cursor-pointer group overflow-hidden">
                  <div className="flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                    <Upload className="w-10 h-10 text-slate-300 mb-3 group-hover:text-red-500 transition-colors" />
                    <p className="text-sm font-bold text-slate-700">Select Multiple Files</p>
                    <p className="text-xs text-slate-400 mt-1">Upload images of the newspaper pages (Max 20)</p>
                  </div>
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="hidden" 
                  />
                </label>

                {previews.length > 0 && (
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 mt-4 max-h-60 overflow-y-auto p-2 bg-slate-50 rounded-xl border border-slate-100">
                    {previews.map((url, i) => (
                      <div key={i} className="relative aspect-[3/4] rounded-lg overflow-hidden border border-slate-200 shadow-sm bg-white">
                        <img src={url} alt={`Page ${i+1}`} className="w-full h-full object-cover" />
                        <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1 rounded font-bold">
                          P-{i+1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-8 border-t border-slate-100 mt-8">
              <button
                type="button"
                onClick={resetForm}
                disabled={uploading}
                className="px-6 py-2.5 bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 rounded-xl transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={uploading}
                className="px-6 py-2.5 bg-red-600 text-white font-bold text-sm rounded-xl hover:bg-red-700 transition-all shadow-sm shadow-red-200 flex items-center gap-2 active:scale-[0.98] disabled:opacity-70"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Publish Edition
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 text-slate-500 text-[11px] uppercase tracking-wider font-bold border-b border-slate-200">
                  <th className="py-4 px-8 w-1/3">Edition Title</th>
                  <th className="py-4 px-6 text-center">Date</th>
                  <th className="py-4 px-6 text-center">Pages</th>
                  <th className="py-4 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="py-4 px-8"><div className="h-4 bg-slate-100 rounded w-2/3"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-slate-100 rounded w-24 mx-auto"></div></td>
                      <td className="py-4 px-6"><div className="h-4 bg-slate-100 rounded w-12 mx-auto"></div></td>
                      <td className="py-4 px-8"></td>
                    </tr>
                  ))
                ) : editions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-16 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center mb-4 text-slate-300">
                           <FileText className="w-8 h-8" />
                        </div>
                        <p className="text-[15px] font-bold text-slate-800">No editions found</p>
                        <p className="text-sm font-medium text-slate-500 mt-1">Start by uploading your first E-Paper edition.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  editions.map((ed) => (
                    <tr key={ed._id} className="hover:bg-slate-50/80 transition-colors group">
                      <td className="py-4 px-8">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center text-red-600">
                            <Newspaper size={18} />
                          </div>
                          <p className="font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                            {ed.title}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-bold border border-slate-200">
                          <Calendar size={12} />
                          {new Date(ed.date).toLocaleDateString("en-GB")}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center font-bold text-slate-600">
                        {ed.pages?.length || 0} Pages
                      </td>
                      <td className="py-4 px-8 text-right">
                        <button 
                          onClick={() => handleDelete(ed._id)}
                          className="p-2 text-slate-400 hover:text-red-600 bg-white border border-slate-200 hover:border-red-200 hover:bg-red-50 rounded-xl transition-all shadow-sm"
                          title="Delete Edition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEPaper;
