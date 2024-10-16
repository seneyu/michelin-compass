import React from 'react';
import Details from './Details';
import { Restaurant } from '../types/interface';

interface Props {
  restaurant: Restaurant;
}

// passing in the restaurant prop
const RestaurantCard: React.FC<Props> = ({ restaurant }) => {
  let totalStars = [];

  // render star icons
  for (let i = 0; i < restaurant.distinction; i++) {
    totalStars.push(
      <img
        key={i}
        src="https://cdn1.iconfinder.com/data/icons/christmas-flat-4/58/019_-_Star-128.png"
        alt="star-icon"
        className="icon-star"
      />
    );
  }

  return (
    <div className="restaurant-card">
      <h4>
        <b>
          <span>{totalStars}</span>
          <br></br>
          {restaurant.name}
        </b>
      </h4>
      <p>{restaurant.address}</p>
      <p>{restaurant.cuisine}</p>
      <Details restaurant={restaurant} />
      <button
        className="other-buttons"
        onClick={() => window.open(restaurant.website)}>
        Website
      </button>
    </div>
  );
};

export default RestaurantCard;
