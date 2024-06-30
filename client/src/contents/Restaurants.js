import React from 'react';
import supabase from '../config/supabaseClient';
import { useEffect, useState } from 'react';

// components
import RestaurantCard from '../components/RestaurantCard';

const Restaurants = () => {
  const [fetchError, setFetchError] = useState(null);
  const [restaurants, setRestaurants] = useState(null);

  // useEffect runs after a component's initial render and when the values of its arugments change
  useEffect(() => {
    const fetchRestaurants = async () => {
      // fetching data from table named 'restaurants' in supabase
      const { data, error } = await supabase.from('restaurants').select();

      if (error) {
        setFetchError('Could not fetch the restaurants');
        setRestaurants(null);
        console.log(error);
      }

      if (data) {
        setRestaurants(data);
        setFetchError(null);
      }
    };

    fetchRestaurants();
  }, []);

  return (
    <div className="">
      {fetchError && <p>{fetchError}</p>}
      {restaurants && (
        <div className="restaurants">
          {/* {order-by buttons} */}
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant.id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
