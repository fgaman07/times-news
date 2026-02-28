import React from 'react'
import { Link } from "react-router-dom"
import { Newspaper, Globe, MapPin, Film, Trophy, Cpu, Camera } from "lucide-react";

const NewsCatagory = ({horizontal = false}) => {
    const categories = [
  { name: "देश", icon: Newspaper },
  { name: "विदेश",  icon: Globe },
  { name: "राज्य", icon: MapPin },
  { name: "शहर", icon: MapPin },
  { name: "मनोरंजन",  icon: Film },
  { name: "क्रिकेट", icon: Trophy },
  { name: "टेक्नोलॉजी", icon: Cpu },
  { name: "फोटोज़", icon: Camera },
];
  return (
    <div className="px-2 py-3">
      <ul
        className={`flex ${
          horizontal
            ? "flex-row overflow-x-auto whitespace-nowrap gap-6 scrollbar-hide"
            : "flex-col gap-2"
        }`}
      >
        {categories.map((item, index) => {
          const Icon = item.icon;

          // ✅ Conditional styles
          const liClass = horizontal
            ? "flex items-center gap-2 cursor-pointer hover:text-orange-500 shrink-0"
            : "flex items-center gap-3 px-2 py-3 rounded cursor-pointer hover:text-orange-500 shrink-0";

          const iconSize = horizontal ? 20 : 30;
          const textClass = horizontal
            ? "font-semibold text-sm"
            : "font-bold text-md";

          return (
            <li key={index}> 
            <Link to={`/category/${encodeURIComponent(item.name)}`} className={liClass}>
              <Icon size={iconSize} />
              <span className={textClass}>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  )
}

export default NewsCatagory
