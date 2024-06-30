import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';

const Details = ({ restaurant }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Details
      </button>{' '}
      <Collapse in={open}>
        <div id="collapse-text">
          <b>MICHELIN Guide’s Point Of View: </b>
          <br></br>
          {restaurant.description}
        </div>
      </Collapse>
    </>
  );
};

export default Details;
