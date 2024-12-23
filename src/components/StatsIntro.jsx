import { useEffect } from "react";

export default function StatsIntro() {
  function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

  useEffect(() => {
    // Target all elements with specific IDs
    const counters = [
      { id: "years", start: 0, end: 18, duration: 4000 },
      { id: "menus", start: 0, end: 100, duration: 4000 },
      { id: "staffs", start: 0, end: 50, duration: 4000 },
      { id: "customers", start: 0, end: 15000, duration: 4000 },
    ];

    counters.forEach(({ id, start, end, duration }) => {
      const obj = document.getElementById(id);
      if (obj) {
        animateValue(obj, start, end, duration);
      }
    });
  }, []); // Runs only once after the component mounts

  return (
    <div className="container md:mx-auto md:px-4 py-2 md:py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="grid grid-cols-1 max-sm:hidden md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-16">
          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#3d3b3a]" id="years">
              18
            </h3>
            <p className="mt-2 text-sm text-gray-600 uppercase tracking-wider">
              Years of Experienced
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#3d3b3a]" id="menus">
              100
            </h3>
            <p className="mt-2 text-sm text-gray-600 uppercase tracking-wider">
              Menus/Dish
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#3d3b3a]" id="staffs">
              50
            </h3>
            <p className="mt-2 text-sm text-gray-600 uppercase tracking-wider">
              Staffs
            </p>
          </div>
          <div className="text-center">
            <h3 className="text-5xl font-bold text-[#3d3b3a]" id="customers">
              15,000
            </h3>
            <p className="mt-2 text-sm text-gray-600 uppercase tracking-wider">
              Happy Customers
            </p>
          </div>
        </div>
        <div className="md:w-[20%] text-gray-600">
          <p className="leading-relaxed">
            A small river named Duden flows by their place and supplies it with
            the necessary regelialia.
          </p>
        </div>
      </div>
    </div>
  );
}
