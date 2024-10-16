import { useEffect, useState } from 'react';
// import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Nav from './contents/Nav';
import Restaurants from './contents/Restaurants';
// import MyGoogleMap from './contents/GoogleMap';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import WriteReview from './pages/WriteReview';
import ReviewEntries from './pages/ReviewEntries';
import { Restaurant } from './types/interface';
// const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const App = () => {
  const [fetchError, setFetchError] = useState<string>('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  // useEffect runs after a component's initial render and when the values of its arugments change
  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch('/api/restaurants');

        if (!response.ok) {
          throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        console.log('data: ', data);
        setRestaurants(data);
      } catch (error) {
        setFetchError('Could not fetch the restaurants');
        setRestaurants([]);
        console.error('Fetch error: ', error);
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
              {/* <MyGoogleMap /> */}
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
