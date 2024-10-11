import React from 'react';

// components
import RestaurantCard from '../components/RestaurantCard';

const Restaurants = ({ restaurants, fetchError }) => {
  return (
    <div className="">
      {fetchError && <p>{fetchError}</p>}
      {restaurants && (
        <div className="restaurants">
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
