import React, { useState, useEffect } from 'react';
import ReviewEntryCard from '../components/ReviewEntryCard';
import Modal from './Modal';
import axios from 'axios';

const ReviewEntries = ({ restaurants }) => {
  const [reviews, setReviews] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // get request for fetching review entries
        const response = await fetch('http://localhost:3000/reviews');
        if (response.ok) {
          const data = await response.json();
          setReviews(data);
        } else {
          console.error('Failed to fetch reviews.');
        }
      } catch (error) {
        console.error('An error occurred when fetching data: ', error);
      }
    };

    fetchReviews();
  }, []);

  // pass a callback to Modal and then ReviewForm to handle the modal closing and refreshing the reviews
  const handleReviewSubmit = async (newReview) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/reviews',
        newReview
      );
      if (response.status === 200) {
        alert('Review submitted!');
        const updatedReviews = await fetch('http://localhost:3000/reviews');
        const data = await updatedReviews.json();
        setReviews(data);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('An error occurred when posting review: ', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/reviews/${reviewId}`
      );
      if (response.status === 200) {
        alert('Post deleted!');
        const updateReviews = reviews.filter(
          (review) => review.id !== parseInt(reviewId)
        );
        setReviews(updateReviews);
      }
    } catch (error) {
      console.error('An error occurred when deleting a review post: ', error);
    }
  };

  return (
    <div className="pages">
      <h3>Reviews</h3>
      <div>
        <button className="other-buttons" onClick={() => setShowAddModal(true)}>
          + Add Review
        </button>
        {showAddModal && (
          <Modal
            restaurants={restaurants}
            onClose={() => setShowAddModal(false)}
            onReviewSubmit={handleReviewSubmit}
          />
        )}
      </div>
      <ReviewEntryCard reviews={reviews} onDeleteSubmit={handleDelete} />
    </div>
  );
};

export default ReviewEntries;
