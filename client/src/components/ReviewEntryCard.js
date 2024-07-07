import React from 'react';

const ReviewEntryCard = ({ reviews, onDeleteSubmit }) => {
  const onClick = async (event) => {
    event.preventDefault();

    // locate the node id and delete from database
    // locate the parent node and remove child
    const reviewId = event.target.id;

    try {
      await onDeleteSubmit(event.target.id);
      const reviewElement = event.target.closest('.review');
      if (reviewElement) {
        reviewElement.remove();
      }
    } catch (error) {
      console.error('An error occurred when deleting the post: ', error);
      alert(`Error: ${error.response.data.message.err}`);
    }
  };

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={index} className="review">
          {/* <p>Post #{review.id}</p> */}
          <p>Restaurant: {review.restaurant}</p>
          <p>Rating: {review.rating}</p>
          <p>Comment: {review.comment}</p>
          <button className="other-buttons" id={review.id} onClick={onClick}>
            Delete Post
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewEntryCard;
