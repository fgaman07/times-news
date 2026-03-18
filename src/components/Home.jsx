import React from 'react';
import NewsCatagory from './NewsCatagory';
import RightSidebar from './RightSidebar';
import Footer from './Footer';
import NewsSection from './NewsSection';

const Home = () => {
  return (
    <div className="bg-gray-100 min-h-screen">

      {/* Mobile: Horizontal Categories */}
      <div className="md:hidden border-b bg-white">
        <NewsCatagory horizontal />
      </div>

      <div className="flex max-w-7xl mx-auto px-2 md:px-4 flex-col lg:flex-row gap-4 py-3">

        {/* Left Sidebar */}
        <div className="hidden lg:block lg:w-52 shrink-0">
          <div className="sticky top-16 bg-white border border-gray-200 rounded overflow-hidden">
            <div className="bg-red-600 text-white px-3 py-2">
              <h3 className="text-lg text-center font-bold uppercase tracking-wide">कैटेगरी</h3>
            </div>
            <NewsCatagory />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-1 gap-4 min-h-screen">
          <div className="flex-1 min-w-0">
            <NewsSection />
          </div>

          {/* Right Sidebar */}
          <div className="hidden md:block w-72 shrink-0">
            <div className="sticky top-16">
              <RightSidebar />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;
