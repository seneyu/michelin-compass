import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Collapse from 'react-bootstrap/Collapse';
import { Restaurant } from '../types/interface';

interface RestaurantProps {
  restaurant: Restaurant;
}

const Details: React.FC<RestaurantProps> = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="other-buttons">
        Details
      </button>{' '}
      {/* <Collapse in={open}>
        <div id="collapse-text">
          <b>MICHELIN Guide’s Point Of View: </b>
          <br></br>
          {restaurant.description}
        </div>
      </Collapse> */}
    </>
  );
};

export default Details;
