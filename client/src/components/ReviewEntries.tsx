import React, { useState, useEffect } from 'react';
import { Restaurant, Review, ReviewFormData } from '../types/interface';
import ReviewEntryCard from './ReviewEntryCard';
import Modal from './Modal';

interface Props {
  restaurants: Restaurant[];
}

const ReviewEntries: React.FC<Props> = ({ restaurants }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // get request for fetching review entries
        const response = await fetch('/api/reviews');

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Review[] = await response.json();

        const sortedReviews = data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setReviews(sortedReviews);
      } catch (error) {
        console.error('An error occurred when fetching data: ', error);
      }
    };

    fetchReviews();
  }, []);

  // pass a callback to Modal and then ReviewForm to handle the modal closing and refreshing the reviews
  const handleReviewSubmit = async (newReview: ReviewFormData) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newReview),
      });

      if (!response.ok) {
        alert('Please login.');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      if (data) {
        setReviews((prevReviews) =>
          [data, ...prevReviews].sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
        );
        setShowAddModal(false);
      }
    } catch (error) {
      console.error('An error occurred when posting review: ', error);
    }
  };

  const handleUpdate = async (reviewId: number, updateInfo: ReviewFormData) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateInfo),
      });

      if (!response.ok) {
        alert('Please login.');
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

  const handleDelete = async (reviewId: number) => {
    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        alert('Please login.');
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      setReviews((prevReviews) =>
        prevReviews.filter((review) => review._id !== reviewId)
      );
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
