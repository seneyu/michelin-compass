import React, { useState } from 'react';
import ModalUpdate from '../pages/ModalUpdate';

const ReviewEntryCard = ({
  restaurants,
  reviews,
  onDeleteSubmit,
  onUpdateSubmit,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [currentReview, setCurrentReview] = useState(null);

  const handleUpdateClick = (review) => {
    setCurrentReview(review);
    setShowUpdateModal(true);
  };

  const onClickDelete = async (event) => {
    event.preventDefault();

    // locate the node id and delete from database
    // locate the parent node and remove child
    const reviewId = event.target.id;

    try {
      await onDeleteSubmit(reviewId);
      const reviewElement = event.target.closest('.review');
      if (reviewElement) {
        reviewElement.remove();
      }
    } catch (error) {
      console.error('An error occurred when deleting the post: ', error);
      alert(`Error: ${error.response.data.message.err}`);
    }
  };

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className="review">
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
            id={review._id}
            onClick={onClickDelete}>
            Delete
          </button>
        </div>
      ))}
      {showUpdateModal && (
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
