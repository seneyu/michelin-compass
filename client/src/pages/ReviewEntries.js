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
      const response = await axios.patch(
        `http://localhost:3000/reviews/${reviewId}`,
        updateInfo
      );
      if (response.status === 200) {
        const updatedPost = response.data;
        // find the index of the updated post in the current reviews array
        // create a new array with the updated post replaced
        const updatedIndex = reviews.findIndex(
          (post) => post.id === updatedPost.id
        );
        const updatedReviews = [...reviews];
        updatedReviews[updatedIndex] = updatedPost;
        setReviews(updatedReviews);
      }
    } catch (error) {
      console.error('An error occurred when updating post: ', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/reviews/${reviewId}`
      );
      if (response.status === 200) {
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
