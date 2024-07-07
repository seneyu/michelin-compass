import React, { useEffect, useState } from 'react';
import supabase from './config/supabaseClient';
// import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Nav from './contents/Nav';
import Restaurants from './contents/Restaurants';
import MyGoogleMap from './contents/GoogleMap';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import WriteReview from './pages/WriteReview';
import ReviewEntries from './pages/ReviewEntries';
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const App = () => {
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
    <div className="main">
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <div className="content">
              <Restaurants restaurants={restaurants} fetchError={fetchError} />
              <MyGoogleMap />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/entries"
          element={<ReviewEntries restaurants={restaurants} />}
        />
        <Route
          path="/writereview"
          element={<WriteReview restaurants={restaurants} />}
        />
      </Routes>
    </div>
  );
};

export default App;
