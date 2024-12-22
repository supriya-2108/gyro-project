"use client";

import { useState } from "react";

const menuItems = ["Main", "Drinks", "Desserts"];

export default function MenuHeader() {
  const [activeItem, setActiveItem] = useState("Breakfast");

  return (
    <nav
      className="w-full flex justify-center mx-auto p-4 mt-10"
      role="navigation"
    >
      <ul className="flex flex-wrap items-center gap-8 md:gap-12">
        {menuItems.map((item) => (
          <li key={item}>
            <button
              onClick={() => setActiveItem(item)}
              className={`relative p-6 text-lg font-medium transition-colors hover:bg-[#C4A484] hover:text-white
               ${activeItem === item ? "text-white" : "text-neutral-600"}
              `}
              aria-current={activeItem === item ? "page" : undefined}
            >
              {activeItem === item && (
                <span
                  className="absolute inset-0 -z-10 text-white bg-[#C4A484] rounded-lg px-6 py-2"
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 75%, 75% 75%, 50% 100%, 25% 75%, 0% 75%)",
                  }}
                />
              )}
              {item}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
