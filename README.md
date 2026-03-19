# 📰 Times News (Frontend Application)

Welcome to the frontend repository of the **Times News Platform**. This is a highly-optimized, modern journalism and news distribution platform built with React and Vite. It features a seamless public newsfeed and a secure, role-based Admin CMS for content management.

![Live Demo](https://img.shields.io/badge/Live_Demo-times--news--one.vercel.app-blue?style=for-the-badge)

## ✨ Key Features

### Public Facing Interface
- **Infinite Scroll Feed:** Buttery-smooth feed featuring hardware-accelerated bi-directional sticky sidebars.
- **Premium Web Stories:** Instagram-style fullscreen visual stories with auto-advancing timers and "Swipe Up" CTAs.
- **Dynamic Content:** Native YouTube video embeds, standardized articles, and downloadable e-Papers.
- **Live Widgets:** Real-time localized Weather & AQI widgets powered by the Open-Meteo API.

### Admin Dashboard (CMS)
- **Role-Based Access Control:** Secure routes isolating standard users, reporters, editors, and super-admins.
- **Rich Media Management:** Create, Read, Update, and Delete articles, categories, and web stories.
- **Analytics:** Real-time metrics tracking user growth, total content, and platform engagement.

---

## 🚀 Tech Stack

- **Framework:** React.js (via Vite)
- **Styling:** Tailwind CSS (Mobile-first, fully responsive design)
- **Routing:** React Router DOM
- **State Management:** React Context API (`UserContext`)
- **Icons:** Lucide React
- **SEO Elements:** React Helmet Async

---

## 🛠️ Local Development Setup

Follow these instructions to run the frontend application locally on your machine.

### 1. Pre-requisites
- Node.js (v18 or higher recommended)
- The Times News Backend Server running locally.

### 2. Installation
Clone the repository and install the dependencies:
```bash
git clone https://github.com/fgaman07/times-news.git
cd times-news
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and specify your backend API URL. You can refer to the `.env.example` file for the exact format:
```env
VITE_API_URL=http://localhost:8000/api/v1
```

### 4. Start Development Server
```bash
npm run dev
```
The application will start on `http://localhost:5173`.

---
*Developed and Maintained by Shivam Gusain & Ankit.*