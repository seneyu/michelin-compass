import React, { useState, useEffect } from 'react';
import { Restaurant, Review, ReviewFormData } from '../types/interface';

interface ReviewFormProps {
  restaurants: Restaurant[];
  review?: Review;
  onSubmit: (review: ReviewFormData) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({
  restaurants,
  review,
  onSubmit,
}) => {
  const [restaurant, setRestaurant] = useState<string>(restaurants[0].name);
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (review) {
      setRestaurant(review.restaurant?.toString() || '');
      setRating(review.rating?.valueOf() || 1);
      setComment(review.comment?.toString() || '');
    }
  }, [review]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newReview: ReviewFormData = {
      restaurant,
      rating,
      comment,
    };

    try {
      onSubmit(newReview);
      setRestaurant('');
      setRating(1);
      setComment('');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
      console.error('An error occurred when posting review: ', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="review-restaurant">Review a Restaurant: </label>
        <select
          id="review-restaurant"
          name="review-restaurant"
          value={restaurant}
          onChange={(e) => setRestaurant(e.target.value)}>
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant) => (
              <option key={restaurant._id.toString()} value={restaurant.name}>
                {restaurant.name}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No restaurants available
            </option>
          )}
        </select>
        <br />
        <br />
        <label htmlFor="review-rating">Select your rating: </label>
        <select
          id="review-rating"
          name="review-rating"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <br />
        <label htmlFor="review-comment">Leave a Comment: </label>
        <textarea
          id="review-comment"
          name="review-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}></textarea>
        <br />
        <br />
        <button className="submit-buttons" type="submit">
          Post Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
