import { useEffect, useState } from 'react';
import Nav from './contents/Nav';
import Restaurants from './contents/Restaurants';
import { Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import WriteReview from './pages/WriteReview';
import ReviewEntries from './pages/ReviewEntries';
import { Restaurant } from './types/interface';
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from '@vis.gl/react-google-maps';

const App = () => {
  const [fetchError, setFetchError] = useState<string>('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);

  const MapAPIKey = process.env.GOOGLE_MAPS_API_KEY;

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
              {MapAPIKey && (
                <APIProvider
                  apiKey={MapAPIKey as string}
                  onLoad={() => console.log('Maps API has loaded.')}>
                  <Map
                    className="map-container"
                    defaultZoom={13}
                    defaultCenter={{
                      lat: 38.5789380221926,
                      lng: -121.50225113309448,
                    }}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                      console.log(
                        'camera changed:',
                        ev.detail.center,
                        'zoom:',
                        ev.detail.zoom
                      )
                    }></Map>
                </APIProvider>
              )}
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
