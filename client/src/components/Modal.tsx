import React from 'react';
import ReviewForm from './ReviewForm';
import { Restaurant, ReviewFormData } from '../types/interface';

interface Props {
  restaurants: Restaurant[];
  onClose: () => void;
  onReviewSubmit: (newReview: ReviewFormData) => void;
}

const Modal: React.FC<Props> = ({ restaurants, onClose, onReviewSubmit }) => {
  const handleSubmit = (newReview: ReviewFormData) => {
    onReviewSubmit(newReview);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div>
          <h3>Write a Review</h3>
          <br />
          <ReviewForm restaurants={restaurants} onSubmit={handleSubmit} />
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
