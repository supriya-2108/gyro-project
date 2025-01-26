import React, { useEffect, useState } from "react";
import { Star } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css"; // AOS CSS
import { Link } from "react-router-dom";

const reviews = [
  {
    id: 1,
    name: "Jody W.",
    image:
      "https://s3-media0.fl.yelpcdn.com/photo/GIvjFkSb9hc96JRHJon38Q/60s.jpg",
    date: "Mar 10, 2023 via Yelp",
    platform: "Yelp",
    text: "Great little spot! Found it here on Yelp by searching for Mediterranean takeout and ordered my dinner between meetings. Excellent dips, plentiful pita, awesome stuffed grape leaves and solid Greek salad. Food was ready quickly and the person there was friendly.",
  },
  {
    id: 2,
    name: "Seamus R.",
    image:
      "https://s3-media0.fl.yelpcdn.com/assets/public/default_user_avatar_64x64_v2.yji-19e0a8ff85b15f4bbd79.png",
    date: "Oct 21, 2023 via Yelp",
    platform: "Yelp",
    text: "Fantastic! Super soft fresh pitas big enough to hold the healthy helpings of toppings and meat. Really friendly service. Hummus was delicious. Everything just had a feeling of someone who really cares about what they do. Will be going back on the regular.",
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
    name: "Steven D.",
    image:
      "https://s3-media0.fl.yelpcdn.com/photo/NksVl1zXq0tYWJOrwsSAMA/60s.jpg",
    date: "May 19, 2023 via Yelp",
    platform: "Yelp",
    text: "friendly service, clean spot. However, have had a few sandwiches and they were just not great barely good. Falafel and toppings w bread just congeal to a gummy mushy consistency. Have ordered twice and same experience. Hummus was delish though! Strong tahini flavor and great whipped texture.Lentil soup had too much lemon and tasted like the fake stuff.Seems like a hot or miss here so order what looks freshest and talk to the makers about what's best that day.",
  },
];

function ReviewSection() {
  const [activePage, setActivePage] = useState(0);

  const [expandedReviews, setExpandedReviews] = useState({});
  // useEffect(() => {
  //   AOS.init({ duration: 1000 });
  //   const intervalId = setInterval(() => {
  //     setActivePage((prevPage) => (prevPage + 1) % (reviews.length - 2));
  //   }, 2000);
  //   return () => clearInterval(intervalId);
  // }, []);

  const toggleReview = (id) => {
    setExpandedReviews((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const reviewsToShow = reviews.slice(activePage, activePage + 3);

  return (
    <section className="py-16 px-4 max-w-7xl my-10 mx-auto">
      <div className="text-center mb-12" data-aos="fade-up">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">
          WHAT OTHERS ARE SAYING...
        </h2>
        <Link to="https://g.co/kgs/Yn1V9TX" target="_blank">
          <p className="text-red-600 font-semibold">SEE REVIEWS FROM GOOGLE</p>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {reviewsToShow.map((review) => (
          <div key={review.id} className="border-0 shadow-lg">
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
              <p
                className={`text-gray-600 mt-4 ${
                  expandedReviews[review.id] ? "" : "line-clamp-2"
                }`}
                style={{
                  overflow: expandedReviews[review.id] ? "visible" : "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: expandedReviews[review.id] ? "none" : 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {review.text}
              </p>
              <button
                onClick={() => toggleReview(review.id)}
                className="text-red-600 hover:text-red-700 font-medium"
              >
                {expandedReviews[review.id] ? "Show less" : "Read more"}
              </button>
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
