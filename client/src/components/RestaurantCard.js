import React, { useState } from 'react';
import Details from './Details';
import Review from './Review';

// passing in the restaurant prop
const RestaurantCard = ({ restaurant }) => {
  //   const [favorites, setFavorites] = useState(null);

  //   const handleToggleChange = () => {
  //     setFavorites(!favorites);
  //   };

  //   const imgOn =
  //     'https://cdn4.iconfinder.com/data/icons/twitter-29/512/166_Heart_Love_Like_Twitter-128.png';
  //   const imgOff =
  //     'https://cdn3.iconfinder.com/data/icons/sympletts-free-sampler/128/heart-128.png';

  return (
    <div className="restaurant-card">
      <h2>{restaurant.name}</h2>
      <p>{restaurant.address}</p>
      <p>{restaurant.cuisine}</p>
      <div className="distinction">{restaurant.distinction}</div>
      {/* <button onClick={handleShowModal}>Details</button> */}
      <Details restaurant={restaurant} />
      <Review restaurant={restaurant} />
    </div>
  );
};

export default RestaurantCard;
