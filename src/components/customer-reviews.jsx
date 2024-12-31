import React, { useState } from "react";
import { StarRating, mockReviews } from "./utils/review-utils"; // Update path as needed
import { Card, CardContent } from "./components/ui/card"; // Update path as needed
import { Button } from "./components/ui/button"; // Update path as needed

const REVIEWS_PER_PAGE = 3;

function CustomerReviews() {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastReview = currentPage * REVIEWS_PER_PAGE;
  const indexOfFirstReview = indexOfLastReview - REVIEWS_PER_PAGE;
  const currentReviews = mockReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const totalPages = Math.ceil(mockReviews.length / REVIEWS_PER_PAGE);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          What Our Customers Say
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
        />
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{review.name}</h3>
            <p className="text-sm text-gray-500">{review.date}</p>
          </div>
          <StarRating rating={review.rating} />
        </div>
        <p className="text-gray-700">{review.comment}</p>
      </CardContent>
    </Card>
  );
}

function Pagination({ currentPage, totalPages, paginate }) {
  return (
    <div className="flex justify-center mt-8 space-x-2">
      <Button
        variant="outline"
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {[...Array(totalPages)].map((_, i) => (
        <Button
          key={i}
          variant={currentPage === i + 1 ? "default" : "outline"}
          onClick={() => paginate(i + 1)}
        >
          {i + 1}
        </Button>
      ))}
      <Button
        variant="outline"
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}

export default CustomerReviews;
