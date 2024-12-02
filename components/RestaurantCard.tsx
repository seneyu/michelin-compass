import React from 'react';
import Details from './Details';
import { Restaurant } from '../types/interface';

interface Props {
  restaurant: Restaurant;
  onRestaurantClick: (lat: string, lng: string) => void;
}

// passing in the restaurant prop
const RestaurantCard: React.FC<Props> = ({ restaurant, onRestaurantClick }) => {
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
      <h4
        onClick={() =>
          onRestaurantClick(restaurant.latitude, restaurant.longitude)
        }>
        <b>
          <span>{totalStars}</span>
          <br></br>
          {restaurant.name}
        </b>
      </h4>
      <p>{restaurant.address}</p>
      <p>{restaurant.cuisine}</p>
      <br />
      <a onClick={() => window.open(restaurant.website)}>
        Visit Official Website
      </a>
      <br />
      <br />
      <Details restaurant={restaurant} />
    </div>
  );
};

export default RestaurantCard;
