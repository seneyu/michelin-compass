import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

const Writereview = ({ restaurants }) => {
  const handleSubmit = (newReview) => {
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
