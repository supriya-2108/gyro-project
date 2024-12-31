import { Star, StarHalf } from "lucide-react";

export const mockReviews = [
  {
    id: 1,
    name: "John Doe",
    rating: 5,
    date: "2023-06-15",
    comment:
      "Absolutely fantastic! The flavors were incredible and the service was top-notch.",
  },
  {
    id: 2,
    name: "Jane Smith",
    rating: 4.5,
    date: "2023-06-10",
    comment:
      "Great food and ambiance. The pasta was cooked to perfection. Highly recommended!",
  },
  {
    id: 3,
    name: "Mike Johnson",
    rating: 4,
    date: "2023-06-05",
    comment:
      "Enjoyed my meal here. The staff was friendly and attentive. Will come back again.",
  },
  {
    id: 4,
    name: "Emily Brown",
    rating: 5,
    date: "2023-05-30",
    comment:
      "One of the best dining experiences I've had. The chef's special was outstanding!",
  },
  {
    id: 5,
    name: "Chris Lee",
    rating: 4.5,
    date: "2023-05-25",
    comment:
      "Lovely atmosphere and delicious food. The wine selection was impressive.",
  },
  {
    id: 6,
    name: "Sarah Wilson",
    rating: 4,
    date: "2023-05-20",
    comment:
      "Good food and service. The dessert was a bit too sweet for my taste, but overall a nice experience.",
  },
  // Add more mock reviews as needed
];

export function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  return (
    <div className="flex">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      ))}
      {hasHalfStar && (
        <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />
      )}
      {[...Array(5 - Math.ceil(rating))].map((_, i) => (
        <Star key={i + fullStars} className="w-5 h-5 text-gray-300" />
      ))}
    </div>
  );
}
