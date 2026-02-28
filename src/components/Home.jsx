import NewsCatagory from './NewsCatagory'
import RightSidebar from './RightSidebar'
import Footer from './Footer'
import NewsSection from './NewsSection'

const Home = () => {
  return (
    <div>
      {/* ✅ SMALL SCREEN: Horizontal Categories (RESTORED) */}
      <div className="md:hidden border-b">
        <NewsCatagory horizontal />
      </div>

      <div className="flex max-w-7xl mx-auto px-4 flex-col lg:flex-row gap-4">
        
        {/* ✅ LEFT SIDEBAR (LG only, sticky) */}
        <div className="hidden lg:block lg:w-55 border-r shrink-0">
          <div className="sticky top-16">
            <NewsCatagory />
          </div>
        </div>

        {/* ✅ MAIN CONTENT */}
        <div className="flex flex-1 gap-4 min-h-screen">
          
          {/* 📰 NEWS (scrollable naturally) */}
          <div className="flex-1 p-4 min-w-0">
            <NewsSection />
          </div>

          {/* ✅ RIGHT SIDEBAR (sticky) */}
          <div className="hidden sm:block w-72 border-l p-4 shrink-0">
            <div className="sticky top-16">
              <RightSidebar />
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Home
