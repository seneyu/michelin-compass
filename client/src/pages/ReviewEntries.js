import React, { useState, useEffect } from 'react';
import ReviewEntryCard from '../components/ReviewEntryCard';
import Modal from './Modal';

const ReviewEntries = ({ restaurants }) => {
  const [reviews, setReviews] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // get request for fetching review entries
        const response = await fetch('http://localhost:3000/reviews');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setReviews(data);
      } catch (error) {
        console.error('An error occurred when fetching data: ', error);
      }
    };

    fetchReviews();
  }, []);

  // pass a callback to Modal and then ReviewForm to handle the modal closing and refreshing the reviews
  const handleReviewSubmit = async (newReview) => {
    try {
      const response = await fetch('http://localhost:3000/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newReview }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      // if (response.status === 200) {
      if (data) {
        const newPost = response.data;
        // update the state by appending the newPost
        // react re-renders the components affected by that state change
        // have newPost listed on top of list
        setReviews((prevPosts) => [newPost, ...prevPosts]);
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('An error occurred when posting review: ', error);
    }
  };

  const handleUpdate = async (reviewId, updateInfo) => {
    try {
      const response = await fetch(
        `http://localhost:3000/reviews/${reviewId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateInfo),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedPost = await response.json();

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review.id === updatedPost.id ? updatedPost : review
        )
      );

      console.log('Post updated successfully!');
    } catch (error) {
      console.error('An error occurred when updating post: ', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/reviews/${reviewId}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const updateReviews = reviews.filter(
        (review) => review.id !== parseInt(reviewId)
      );
      setReviews(updateReviews);
      console.log('Review deleted successfully!');
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
      <ReviewEntryCard
        restaurants={restaurants}
        reviews={reviews}
        onDeleteSubmit={handleDelete}
        onUpdateSubmit={handleUpdate}
      />
    </div>
  );
};

export default ReviewEntries;
