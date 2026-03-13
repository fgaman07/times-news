import './App.css'
import { useEffect } from 'react'
import Home from './components/Home'
import {Routes, Route} from "react-router-dom"
import NewsDetail from './components/NewsDetail'
import Navbar from './components/Navbar'
import SearchPage from './components/SearchPage'
import Login from './components/Login'
import Signup from './components/Signup'

import VideoPage from './components/VideoPage'
import EPaperPage from './components/EPaperPage'
import WebStoryPage from './components/WebStoryPage'


import AdminRoute from './components/admin/AdminRoute'
import AdminLayout from './components/admin/AdminLayout'
import AdminLogin from './components/admin/AdminLogin'
import AdminNews from './components/admin/AdminNews'
import AdminDashboard from './components/admin/AdminDashboard'
import AdminVideos from './components/admin/AdminVideos'
import AdminWebStory from './components/admin/AdminWebStory'
import AdminCategories from './components/admin/AdminCatagories'
import AdminUsers from './components/admin/AdminUser'
import AdminRoles from './components/admin/AdminRoles'
import AdminMedia from './components/admin/AdminMedia'
import AdminComments from './components/admin/AdminComments'
import AdminSettings from './components/admin/AdminSettings'

function App() {

  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element ={<Home />} />
        <Route path="/news/:index" element={<NewsDetail />} />
        <Route path="/category/:categoryName" element={<Home />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />

        <Route path="/videos" element={<VideoPage />} />
        <Route path="/epaper" element={<EPaperPage />} />
        <Route path="/webstory" element={<WebStoryPage />} />

        

        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route path='login' element={<AdminLogin />} />
          <Route index element={<AdminDashboard />} />
          <Route path="news" element={<AdminNews />} />
          <Route path="videos" element={<AdminVideos />} />
          <Route path="webstory" element={<AdminWebStory />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="roles" element={<AdminRoles />} />
          <Route path="comments" element={<AdminComments />} />
          <Route path="media" element={<AdminMedia />} />
          <Route path="settings" element={<AdminSettings />} />
        </Route>

      </Routes>
    </>
  )
}

export default App
