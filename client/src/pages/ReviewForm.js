import React from 'react';
import axios from 'axios';

const ReviewForm = ({ restaurants, onSubmit }) => {
  console.log(restaurants);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const restaurant = event.target.elements['review-restaurant'].value;
    const rating = event.target.elements['review-rating'].value;
    const comment = event.target.elements['review-comment'].value;

    try {
      const response = await axios.post('http://localhost:3000/reviews', {
        restaurant,
        rating,
        comment,
      });
      if (response) {
        console.log(response);
        alert('Review submitted successfully!');
        onSubmit(response.data);
        event.target.reset();
      }
    } catch (error) {
      console.error('An error occurred when posting review: ', error);
      alert(`Error: ${error.response.data.message.err}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="review-restaurant">Review a Restaurant: </label>
        <select id="review-restaurant" name="review-restaurant">
          {restaurants && restaurants.length > 0 ? (
            restaurants.map((restaurant, index) => (
              <option key={index} value={restaurant.name}>
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
        <select id="review-rating" name="review-rating">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br />
        <br />
        <label htmlFor="review-comment">Leave a Comment: </label>
        <textarea id="review-comment" name="review-comment"></textarea>
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
