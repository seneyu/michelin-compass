import React from 'react';
import ReviewForm from '../components/ReviewForm';
import { Restaurant, ReviewFormData } from '../types/interface';

interface Props {
  restaurants: Restaurant[];
}

const Writereview: React.FC<Props> = ({ restaurants }) => {
  const handleSubmit = (newReview: ReviewFormData) => {
    console.log('New Review Submitted: ', newReview);
  };

  return (
    <div className="pages">
      <h3>Write a Review</h3>
      <br />
      <ReviewForm restaurants={restaurants} onSubmit={handleSubmit} />
    </div>
  );
};

export default Writereview;
