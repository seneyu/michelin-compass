import React from 'react';
import ReviewForm from './ReviewForm';

const ModalUpdate = ({ restaurants, review, onClose, onSubmit }) => {
  const handleUpdateSubmit = (updatedReview) => {
    onSubmit(review.id, updatedReview);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3>Update a Review</h3>
          <br />
          <ReviewForm
            review={review}
            onSubmit={handleUpdateSubmit}
            restaurants={restaurants}
          />
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ModalUpdate;
