import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS

const reviews = [
  {
    id: 1,
    name: "KATIE R.",
    image:
      "https://tse4.mm.bing.net/th?id=OIP.lfq10Y4d1zOMcd_dvEw80AHaGR&pid=Api&P=0&h=180",
    date: "7/22/2018 via Yelp",
    platform: "Yelp",
    text: "Third dinner here in the past two weeks and it just keeps getting better! Love every dish on the menu, especially the...",
  },
  {
    id: 2,
    name: "NICK T.",
    image:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?cs=srgb&dl=pexels-italo-melo-2379005.jpg&fm=jpg",
    date: "7/13/2018 via Yelp",
    platform: "Yelp",
    text: "It is the bomb! Must try This restauranteur loves what they do and it shows. The food was phenomenal, service was great...",
  },
  {
    id: 3,
    name: "LAUREN M.",
    image:
      "https://i.pinimg.com/originals/47/53/2e/47532ea114173ea79fc32eeba4b9fec0.jpg",
    date: "6/24/2018 via Yelp",
    platform: "Yelp",
    text: "A friend and I had brunch at Birch & Maple last Thursday, June 21. The interior and exterior have been completely...",
  },
  {
    id: 4,
    name: "JOHN D.",
    image:
      "https://images.pexels.com/photos/1053497/pexels-photo-1053497.jpeg?cs=srgb&dl=pexels-photo-1053497.jpg&fm=jpg",
    date: "7/05/2018 via Yelp",
    platform: "Yelp",
    text: "Loved the atmosphere! Excellent service, and the food was just as good as I had hoped for. Highly recommend...",
  },
  {
    id: 5,
    name: "SARAH W.",
    image:
      "https://images.pexels.com/photos/2272336/pexels-photo-2272336.jpeg?cs=srgb&dl=pexels-sarah-ludwig-2272336.jpg&fm=jpg",
    date: "6/28/2018 via Yelp",
    platform: "Yelp",
    text: "Amazing experience! The flavors were outstanding, and I would definitely return for another meal soon...",
  },
  {
    id: 6,
    name: "SARAH W.",
    image:
      "https://images.pexels.com/photos/2272336/pexels-photo-2272336.jpeg?cs=srgb&dl=pexels-sarah-ludwig-2272336.jpg&fm=jpg",
    date: "6/28/2018 via Yelp",
    platform: "Yelp",
    text: "Amazing experience! The flavors were outstanding, and I would definitely return for another meal soon...",
  },
];

function ReviewSection() {
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with a 1-second animation duration
    const intervalId = setInterval(() => {
      setActivePage((prevPage) => (prevPage + 1) % (reviews.length - 2)); // Ensure 3 cards are visible at a time
    }, 2000); // Change review every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const reviewsToShow = reviews.slice(activePage, activePage + 3);

  return (
    <section className="py-16 px-4 max-w-7xl my-10 mx-auto">
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          WHAT OTHERS ARE SAYING...
        </h2>
        <p className="text-red-600 font-semibold">SEE REVIEWS FROM GOOGLE</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviewsToShow.map((review) => (
          <div
            key={review.id}
            className="border-0 shadow-lg"
            data-aos="fade-up"
          >
            <div className="p-6">
              <div className="flex items-start gap-4">
                <img
                  src={review.image}
                  alt={`${review.name}'s profile`}
                  width={80}
                  height={80}
                  className="rounded-md"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-700">
                      {review.name}
                    </h3>
                  </div>
                  <div className="flex text-red-500 my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mb-4">{review.date}</p>
                </div>
              </div>
              <p className="text-gray-600 mt-4">
                {review.text}{" "}
                <button className="text-red-600 hover:text-red-700 font-medium">
                  Read more
                </button>
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8 gap-2">
        {[...Array(Math.ceil(reviews.length / 3))].map((_, i) => (
          <button
            key={i}
            className={`w-3 h-3 rounded-full transition-colors ${
              i === activePage ? "bg-blue-500" : "bg-gray-300"
            }`}
            onClick={() => setActivePage(i)}
            aria-label={`Go to review page ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

export default ReviewSection;
