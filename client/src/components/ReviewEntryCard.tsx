import React, { useState } from 'react';
import ModalUpdate from '../pages/ModalUpdate';
import { Restaurant, Review, ReviewFormData } from '../types/interface';

interface ReviewEntryCardProps {
  restaurants: Restaurant[];
  reviews: Review[];
  onDeleteSubmit: (reviewId: number) => void;
  onUpdateSubmit: (reviewId: number, updateInfo: ReviewFormData) => void;
}

const ReviewEntryCard: React.FC<ReviewEntryCardProps> = ({
  restaurants,
  reviews,
  onDeleteSubmit,
  onUpdateSubmit,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentReview, setCurrentReview] = useState<Review | null>(null);

  const handleUpdateClick = (review: Review) => {
    setCurrentReview(review);
    setShowUpdateModal(true);
  };

  const handleDelete = async (reviewId: number) => {
    try {
      await onDeleteSubmit(reviewId);
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
      console.error('An error occurred when deleting the post: ', error);
    }
  };

  return (
    <div>
      {reviews.map((review) => (
        <div key={review._id} className="review">
          <p>Restaurant: {review.restaurant}</p>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
          <p>Created At: {review.createdAt}</p>
          <button
            className="other-buttons"
            onClick={() => handleUpdateClick(review)}>
            Update
          </button>
          <button
            className="other-buttons"
            onClick={() => handleDelete(review._id)}>
            Delete
          </button>
        </div>
      ))}
      {showUpdateModal && currentReview && (
        <ModalUpdate
          restaurants={restaurants}
          review={currentReview}
          onClose={() => setShowUpdateModal(false)}
          onSubmit={onUpdateSubmit}
        />
      )}
    </div>
  );
};

export default ReviewEntryCard;
