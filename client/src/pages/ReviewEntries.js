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
        const response = await fetch('/api/reviews');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        const sortedReviews = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews);
      } catch (error) {
        console.error('An error occurred when fetching data: ', error);
      }
    };

    fetchReviews();
  }, []);

  // pass a callback to Modal and then ReviewForm to handle the modal closing and refreshing the reviews
  const handleReviewSubmit = async (newReview) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        setReviews((prevReviews) =>
          [data, ...prevReviews].sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          )
        );
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('An error occurred when posting review: ', error);
    }
  };

  const handleUpdate = async (reviewId, updateInfo) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateInfo),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const updatedPost = await response.json();

      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === updatedPost._id ? updatedPost : review
        )
      );

      console.log('Post updated successfully!');
    } catch (error) {
      console.error('An error occurred when updating post: ', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data) {
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== data._id)
        );
        console.log('Review deleted successfully!');
      } else {
        console.error('Deletion was not successful.');
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
