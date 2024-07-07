import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewEntries = () => {
  // console.log('reviews: ', reviews);
  const [reviews, setReviews] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // get request for fetching review entries
        const response = await axios.get('http://localhost:3000/reviews');
        if (response) {
          console.log('response: ', response);
          setReviews(response.data);
        }
      } catch (error) {
        console.error('An error occurred when fetching data: ', error);
        setFetchError('Could not fetch the reviews.');
      }
    };

    fetchReviews();
  }, []);

  // const handleDelete = async () => {
  //   // const postToDelete =

  //   try {
  //     const response = await axios.delete('http://localhost:3000/reviews/:id');
  //   } catch (error) {
  //     console.error('An error occurred when deleting a review post: ', error);
  //     setFetchError('Could not delete the review.');
  //   }
  // };

  return (
    <div className="pages">
      <h3>Review Entries</h3>
      <div>
        {reviews && reviews.length > 0 ? (
          reviews.map((review, index) => (
            <div key={index} className="review">
              <p>Post ID: ${review.id}</p>
              <p>Restaurant: {review.restaurant}</p>
              <p>Rating: {review.rating}</p>
              <p>Comment: {review.comment}</p>
              <button
                className="other-buttons"
                index={index}
                onClick={() => {
                  alert('Route Not Connected Yet!');
                }}
              >
                Delete Post
              </button>
            </div>
          ))
        ) : (
          <p>No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default ReviewEntries;
