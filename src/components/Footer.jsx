import React from 'react'
import { Facebook, Twitter, Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold text-white mb-3">
            Times News
          </h2>
          <p className="text-sm leading-relaxed">
            भारत और दुनिया की ताज़ा खबरें, वीडियो, और विश्लेषण —
            सबसे पहले, सबसे भरोसेमंद।
          </p>
        </div>

        {/* News Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            न्यूज़
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">देश</li>
            <li className="hover:text-orange-500 cursor-pointer">विदेश</li>
            <li className="hover:text-orange-500 cursor-pointer">राज्य</li>
            <li className="hover:text-orange-500 cursor-pointer">शहर</li>
            <li className="hover:text-orange-500 cursor-pointer">क्रिकेट</li>
          </ul>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            उपयोगी लिंक
          </h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-orange-500 cursor-pointer">About Us</li>
            <li className="hover:text-orange-500 cursor-pointer">Contact</li>
            <li className="hover:text-orange-500 cursor-pointer">Privacy Policy</li>
            <li className="hover:text-orange-500 cursor-pointer">Terms & Conditions</li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-sm font-semibold text-white mb-3">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <Facebook className="hover:text-orange-500 cursor-pointer" />
            <Twitter className="hover:text-orange-500 cursor-pointer" />
            <Youtube className="hover:text-orange-500 cursor-pointer" />
            <Instagram className="hover:text-orange-500 cursor-pointer" />
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        © {new Date().getFullYear()} Times News. All rights reserved.
      </div>

    </footer>
  )
}

export default Footer
