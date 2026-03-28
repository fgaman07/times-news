import React from 'react'
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-6 border-t border-gray-800">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8 grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 w-full">
        
        {/* Brand - Span 2 columns on mobile */}
        <div className="col-span-2 md:col-span-1">
          <h2 className="text-lg font-bold text-white mb-2">
            Aaj Ka Mudda
          </h2>
          <p className="text-xs leading-relaxed text-gray-400">
            भारत और दुनिया की ताज़ा खबरें, वीडियो, और विश्लेषण —
            सबसे पहले, सबसे भरोसेमंद।
          </p>
        </div>

        {/* News Links */}
        <div className="col-span-1">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
            न्यूज़
          </h3>
          <ul className="space-y-1.5 text-xs">
            <li><Link to="/category/देश" className="hover:text-red-500 transition-colors">देश</Link></li>
            <li><Link to="/category/विदेश" className="hover:text-red-500 transition-colors">विदेश</Link></li>
            <li><Link to="/category/राज्य" className="hover:text-red-500 transition-colors">राज्य</Link></li>
            <li><Link to="/category/शहर" className="hover:text-red-500 transition-colors">शहर</Link></li>
            <li><Link to="/category/क्रिकेट" className="hover:text-red-500 transition-colors">क्रिकेट</Link></li>
          </ul>
        </div>

        {/* Useful Links */}
        <div className="col-span-1">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
            लिंक
          </h3>
          <ul className="space-y-1.5 text-xs">
            <li><Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
            <li><Link to="/privacy" className="hover:text-red-500 transition-colors">Privacy</Link></li>
            <li><Link to="/terms" className="hover:text-red-500 transition-colors">Terms</Link></li>
          </ul>
        </div>

        {/* Social - Centered on mobile */}
        <div className="col-span-2 md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
            Follow Us
          </h3>
          <div className="flex gap-3">
            {[ 
              { Icon: Facebook, href: "https://facebook.com" },
              { Icon: Twitter, href: "https://twitter.com" },
              { Icon: Youtube, href: "https://youtube.com" },
              { Icon: Instagram, href: "https://instagram.com" }
            ].map(({ Icon, href }, idx) => (
              <a key={idx} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white bg-gray-800 p-2 rounded-lg transition-all hover:scale-110">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>


      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800/50 bg-gray-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-[10px] sm:text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Aaj Ka Mudda. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/about" className="hover:text-white">About</Link>
            <Link to="/privacy" className="hover:text-white">Privacy</Link>
            <Link to="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>

    </footer>
  )
}

export default Footer

