import React, { useState, useEffect, useCallback, useRef } from "react";
import { 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  ZoomOut, 
  Calendar as CalendarIcon, 
  Maximize, 
  Download,
  Loader2,
  AlertCircle,
  Share2,
  ArrowRight
} from "lucide-react";
import api from "../assets/api";
import logoImg from '../assets/aajkamudda2.jpg';
import mobileLogo from "../assets/mobilelogo.jpg";

const EPaperPage = () => {
  const [editions, setEditions] = useState([]);
  const [selectedEdition, setSelectedEdition] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [zoomScale, setZoomScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dateInputRef = useRef(null);

  // Fetch all editions metadata
  useEffect(() => {
    const fetchEditions = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/epaper");
        const editionList = data.data || [];
        setEditions(editionList);

        if (editionList.length > 0) {
          // Default to the most recent edition
          fetchEditionDetails(editionList[0].date);
        } else {
          setLoading(false);
          setError("अभी तक कोई ई-पेपर संस्करण उपलब्ध नहीं है।");
        }
      } catch (err) {
        console.error("Failed to fetch editions", err);
        setError("ई-पेपर संस्करण लोड करने में विफल।");
        setLoading(false);
      }
    };
    fetchEditions();
  }, []);

  const fetchEditionDetails = async (date) => {
    try {
      setLoading(true);
      const formattedDate = new Date(date).toISOString().split('T')[0];
      const { data } = await api.get(`/epaper/${formattedDate}`);
      setSelectedEdition(data.data);
      setCurrentPageIndex(0);
      setZoomScale(1);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch edition details", err);
      setError("चयनित तिथि के लिए ई-पेपर संस्करण नहीं मिला।");
      setSelectedEdition(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNextPage = useCallback(() => {
    if (selectedEdition && currentPageIndex < selectedEdition.pages.length - 1) {
      setCurrentPageIndex((prev) => prev + 1);
      setZoomScale(1);
    }
  }, [selectedEdition, currentPageIndex]);

  const handlePrevPage = useCallback(() => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prev) => prev - 1);
      setZoomScale(1);
    }
  }, [currentPageIndex]);

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoomScale(1);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("hi-IN", {
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };

  const handleCalendarToggle = () => {
    dateInputRef.current?.showPicker(); // Opens the native calendar picker
  };

  const onDateChange = (e) => {
    const newDate = e.target.value;
    if (newDate) {
      fetchEditionDetails(newDate);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Aaj Ka Mudda e-Paper',
        url: window.location.href,
      }).catch(console.error);
    }
  };

  if (loading && !selectedEdition) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50">
        <Loader2 className="w-12 h-12 text-red-600 animate-spin mb-4" />
        <p className="text-gray-600 font-bold animate-pulse">Aaj Ka Mudda e-Paper लोड हो रहा है...</p>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];
  const oneMonthAgo = new Date();
  oneMonthAgo.setMonth(new Date().getMonth() - 1);
  const minDate = oneMonthAgo.toISOString().split("T")[0];

  const currentPage = selectedEdition?.pages[currentPageIndex];

  return (
    <div className="bg-[#f0f2f5] min-h-screen flex flex-col font-sans">
      {/* --- High Contrast Professional Header --- */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
        <div className="max-w-screen-2xl mx-auto px-4 h-16 sm:h-20 flex items-center justify-between">
          
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center shrink-0">
               {/* Site Logo Matching Navbar */}
               {/* <picture>
                <source media="(min-width: 768px)" srcSet={logoImg} />
                <img
                  src={mobileLogo}
                  alt="Aaj Ka Mudda"
                  className="h-8 sm:h-10 w-auto object-contain"
                />
              </picture> */}
              <div className="h-6 w-px bg-gray-300 mx-3 hidden sm:block"></div>
              <span className="bg-red-600 text-white px-3 py-1 rounded-sm text-[10px] sm:text-xs font-black tracking-widest uppercase shadow-sm">e-Paper</span>
            </div>

            {/* --- IMPROVED CALENDAR SELECTOR --- */}
            <div className="relative group ml-1 sm:ml-4">
              <input 
                type="date"
                ref={dateInputRef}
                onChange={onDateChange}
                min={minDate}
                max={today}
                className="absolute inset-0 opacity-0 pointer-events-none"
              />
              <button 
                onClick={handleCalendarToggle}
                className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-2 rounded-xl border border-red-100 hover:bg-red-100 transition-all font-bold text-[11px] sm:text-sm active:scale-95 shadow-sm"
              >
                <CalendarIcon size={16} strokeWidth={2.5} />
                <span className="hidden sm:inline">तिथि चुनें</span>
                <span className="sm:hidden text-xs">Calendar</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-3">
             <div className="hidden md:flex items-center bg-gray-100 rounded-2xl p-1 border border-gray-200 mr-2">
                <button onClick={handleZoomOut} className="p-2 hover:bg-white rounded-xl transition text-gray-700"><ZoomOut size={18} /></button>
                <span className="text-xs font-bold w-12 text-center text-red-600">{Math.round(zoomScale * 100)}%</span>
                <button onClick={handleZoomIn} className="p-2 hover:bg-white rounded-xl transition text-gray-700"><ZoomIn size={18} /></button>
             </div>
             
             <button onClick={handleShare} className="p-2.5 hover:bg-red-50 hover:text-red-600 rounded-full transition text-gray-500" title="Share">
               <Share2 size={18} />
             </button>
             <a href={currentPage?.imageUrl} target="_blank" rel="noreferrer" className="p-2.5 hover:bg-red-50 hover:text-red-600 rounded-full transition text-gray-500" title="Download">
               <Download size={18} />
             </a>
             <button onClick={handleResetZoom} className="p-2.5 hover:bg-red-50 hover:text-red-600 rounded-full transition text-gray-500 hidden sm:block" title="Reset Viewer">
               <Maximize size={18} />
             </button>
          </div>
        </div>
      </header>

      {/* --- Edition Context & Quick Info --- */}
      <div className="bg-red-600 text-white py-2.5 shadow-inner">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
             <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shrink-0"></div>
             <p className="text-[11px] sm:text-sm font-bold truncate uppercase tracking-wide">
               {selectedEdition?.title || "Latest Edition"} • {formatDate(selectedEdition?.date)}
             </p>
          </div>
          <div className="flex items-center gap-4 shrink-0 px-2 ml-2">
             <div className="text-[10px] sm:text-xs font-black uppercase opacity-80 border border-white/30 px-2 py-0.5 rounded">
               Page {currentPageIndex + 1} of {selectedEdition?.pages.length || 0}
             </div>
          </div>
        </div>
      </div>

      {/* --- Main Viewer Section --- */}
      <main className="flex-1 overflow-hidden relative flex flex-col items-center justify-center p-2 sm:p-6 lg:p-10 bg-gray-300/40 custom-scrollbar-minimal">
        
        {error ? (
          <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md border-t-4 border-red-600">
            <AlertCircle size={48} className="text-red-600 mx-auto mb-4" />
            <h3 className="text-xl font-black text-gray-900 mb-2">ओह! हमें क्षमा करें</h3>
            <p className="text-gray-600 font-medium mb-6">{error}</p>
            <button 
               onClick={() => window.location.reload()} 
               className="bg-red-600 text-white px-8 py-3 rounded-full font-bold hover:shadow-lg hover:shadow-red-200 transition-all active:scale-95 flex items-center gap-2 mx-auto"
            >
              रीफ्रेश करें <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Desktop Navigation Floating Arrows */}
            <button 
              disabled={currentPageIndex === 0}
              onClick={handlePrevPage}
              className="absolute left-0 lg:left-8 z-40 p-4 bg-white/90 hover:bg-red-600 hover:text-white text-red-600 rounded-full shadow-2xl transition-all disabled:opacity-0 disabled:pointer-events-none active:scale-90 border border-gray-100 hidden sm:flex"
            >
              <ChevronLeft size={32} strokeWidth={3} />
            </button>

            <button 
              disabled={currentPageIndex === selectedEdition?.pages.length - 1}
              onClick={handleNextPage}
              className="absolute right-0 lg:right-8 z-40 p-4 bg-white/90 hover:bg-red-600 hover:text-white text-red-600 rounded-full shadow-2xl transition-all disabled:opacity-0 disabled:pointer-events-none active:scale-90 border border-gray-100 hidden sm:flex"
            >
              <ChevronRight size={32} strokeWidth={3} />
            </button>

            {/* THE PAGE VIEW */}
            <div 
              className={`transition-all duration-300 ease-in-out origin-top shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] bg-white relative overflow-hidden ${loading ? 'opacity-50 grayscale' : 'opacity-100 grayscale-0'}`}
              style={{ transform: `scale(${zoomScale})` }}
            >
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/40 backdrop-blur-[1px] z-10">
                   <div className="flex flex-col items-center">
                      <div className="w-12 h-12 border-4 border-red-100 border-t-red-600 rounded-full animate-spin"></div>
                      <span className="mt-3 text-[10px] font-black uppercase text-red-600 tracking-widest leading-none">Scanning...</span>
                   </div>
                </div>
              )}
              <img 
                 src={currentPage?.imageUrl}
                 alt={`Page ${currentPageIndex + 1}`}
                 className="max-w-full h-auto cursor-zoom-in"
                 style={{ width: 'auto', maxHeight: zoomScale > 1 ? 'none' : 'calc(100vh - 220px)' }}
                 onLoad={() => setLoading(false)}
                 onDoubleClick={handleResetZoom}
              />
            </div>
          </div>
        )}

        {/* Mobile Fixed Controls Overlay */}
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-full border border-gray-200 shadow-2xl sm:hidden z-50">
          <button 
             onClick={handlePrevPage}
             disabled={currentPageIndex === 0}
             className="p-1 disabled:text-gray-300 text-red-600"
          >
            <ChevronLeft size={24} strokeWidth={3} />
          </button>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <span className="text-xs font-black min-w-[60px] text-center">P - {currentPageIndex + 1}</span>
          <div className="w-px h-6 bg-gray-200 mx-1"></div>
          <button 
             onClick={handleNextPage}
             disabled={currentPageIndex === selectedEdition?.pages.length - 1}
             className="p-1 disabled:text-gray-300 text-red-600"
          >
            <ChevronRight size={24} strokeWidth={3} />
          </button>
        </div>
      </main>

      {/* --- Thumbnail Overview Strip --- */}
      {!error && selectedEdition && (
        <div className="bg-white border-t border-gray-200 p-4 pb-6 overflow-hidden hidden sm:block">
          <div className="max-w-screen-2xl mx-auto flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide-custom">
            {selectedEdition?.pages.map((page, idx) => (
              <button
                key={page._id}
                onClick={() => {
                  setLoading(true);
                  setCurrentPageIndex(idx);
                  setZoomScale(1);
                }}
                className={`flex-shrink-0 w-20 h-28 border-4 rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1 ${
                  currentPageIndex === idx 
                  ? 'border-red-600 shadow-xl shadow-red-200 scale-105' 
                  : 'border-white hover:border-gray-200 shadow-sm opacity-60 hover:opacity-100'
                }`}
              >
                <img src={page.imageUrl} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .scrollbar-hide-custom::-webkit-scrollbar { display: none; }
        .scrollbar-hide-custom { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar-minimal::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar-minimal::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar-minimal::-webkit-scrollbar-track { background: transparent; }
        @keyframes scan { 
          from { transform: translateY(-100%); } 
          to { transform: translateY(100%); } 
        }
      `}} />
    </div>
  );
};

export default EPaperPage;
