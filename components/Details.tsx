import React, { useState, useRef, useEffect } from 'react';
import { Restaurant } from '../types/interface';

interface RestaurantProps {
  restaurant: Restaurant;
}

const Details: React.FC<RestaurantProps> = ({ restaurant }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleCollapse = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? contentRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={toggleCollapse}
        className="other-buttons rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button">
        {isOpen ? 'Hide Details' : 'Show Details'}
      </button>{' '}
      <div
        className="mt-2 overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: `${height}px`, opacity: isOpen ? 1 : 0 }}>
        <div ref={contentRef} className="p-2">
          <b>MICHELIN Guide’s Point Of View: </b>
          <br />
          <p className="text-slate-600 font-light">{restaurant.description}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
