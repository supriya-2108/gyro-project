const restaurants = [
  {
    id: 1,
    name: "Tandoori Flames",
    location: {
      city: "Delhi",
      address: "Connaught Place, New Delhi, India",
      latitude: 28.6328,
      longitude: 77.2197,
    },
    cuisine: ["North Indian", "Mughlai"],
    average_cost_for_two: 1200,
    rating: 4.8,
    votes: 2560,
    timings: "12:00 PM - 11:00 PM",
    features: {
      delivery: true,
      dine_in: true,
      takeaway: true,
      outdoor_seating: false,
      alcohol_served: true,
    },
    menu: [
      {
        name: "Butter Chicken",
        price: 450,
        image: "https://source.unsplash.com/400x300/?butter-chicken,food",
      },
      {
        name: "Tandoori Roti",
        price: 50,
        image: "https://source.unsplash.com/400x300/?roti,naan",
      },
    ],
    images: [
      "https://source.unsplash.com/400x300/?restaurant,indian-food",
      "https://source.unsplash.com/400x300/?tandoori,restaurant",
    ],
  },
  {
    id: 2,
    name: "Royal Biryani House",
    location: {
      city: "Hyderabad",
      address: "Banjara Hills, Hyderabad, India",
      latitude: 17.385,
      longitude: 78.4867,
    },
    cuisine: ["Biryani", "North Indian"],
    average_cost_for_two: 1000,
    rating: 4.7,
    votes: 3120,
    timings: "11:00 AM - 12:00 AM",
    features: {
      delivery: true,
      dine_in: true,
      takeaway: true,
      outdoor_seating: true,
      alcohol_served: false,
    },
    menu: [
      {
        name: "Hyderabadi Dum Biryani",
        price: 550,
        image: "https://source.unsplash.com/400x300/?biryani,indian-food",
      },
      {
        name: "Mirchi Ka Salan",
        price: 250,
        image: "https://source.unsplash.com/400x300/?curry,spicy",
      },
    ],
    images: [
      "https://source.unsplash.com/400x300/?biryani,restaurant",
      "https://source.unsplash.com/400x300/?indian-food,spices",
    ],
  },
  {
    id: 3,
    name: "Pind Punjab",
    location: {
      city: "Chandigarh",
      address: "Sector 17, Chandigarh, India",
      latitude: 30.7333,
      longitude: 76.7794,
    },
    cuisine: ["Punjabi", "North Indian"],
    average_cost_for_two: 900,
    rating: 4.6,
    votes: 2200,
    timings: "12:00 PM - 10:30 PM",
    features: {
      delivery: true,
      dine_in: true,
      takeaway: false,
      outdoor_seating: true,
      alcohol_served: true,
    },
    menu: [
      {
        name: "Sarson Ka Saag & Makki Ki Roti",
        price: 400,
        image: "https://source.unsplash.com/400x300/?sarson,makki-roti",
      },
      {
        name: "Lassi",
        price: 150,
        image: "https://source.unsplash.com/400x300/?lassi,drink",
      },
    ],
    images: [
      "https://source.unsplash.com/400x300/?dhaba,restaurant",
      "https://source.unsplash.com/400x300/?punjabi-food,indian",
    ],
  },
  {
    id: 4,
    name: "Bukhara",
    location: {
      city: "Delhi",
      address: "ITC Maurya, Chanakyapuri, New Delhi, India",
      latitude: 28.5952,
      longitude: 77.1734,
    },
    cuisine: ["Mughlai", "North Indian"],
    average_cost_for_two: 3000,
    rating: 4.9,
    votes: 5000,
    timings: "12:30 PM - 11:30 PM",
    features: {
      delivery: false,
      dine_in: true,
      takeaway: true,
      outdoor_seating: false,
      alcohol_served: true,
    },
    menu: [
      {
        name: "Dal Bukhara",
        price: 700,
        image: "https://source.unsplash.com/400x300/?dal,food",
      },
      {
        name: "Tandoori Jhinga",
        price: 950,
        image: "https://source.unsplash.com/400x300/?prawns,grill",
      },
    ],
    images: [
      "https://source.unsplash.com/400x300/?fine-dining,restaurant",
      "https://source.unsplash.com/400x300/?indian-food,mughlai",
    ],
  },
  {
    id: 5,
    name: "Karim’s",
    location: {
      city: "Old Delhi",
      address: "Jama Masjid, Old Delhi, India",
      latitude: 28.6565,
      longitude: 77.2303,
    },
    cuisine: ["Mughlai", "North Indian"],
    average_cost_for_two: 800,
    rating: 4.9,
    votes: 4300,
    timings: "10:00 AM - 11:00 PM",
    features: {
      delivery: true,
      dine_in: true,
      takeaway: true,
      outdoor_seating: false,
      alcohol_served: false,
    },
    menu: [
      {
        name: "Mutton Korma",
        price: 500,
        image: "https://source.unsplash.com/400x300/?mutton,curry",
      },
      {
        name: "Sheermal",
        price: 150,
        image: "https://source.unsplash.com/400x300/?bread,naan",
      },
    ],
    images: [
      "https://source.unsplash.com/400x300/?karims,restaurant",
      "https://source.unsplash.com/400x300/?mughlai,indian-food",
    ],
  },
];

module.exports = restaurants;
