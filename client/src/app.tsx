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
  Marker,
} from '@vis.gl/react-google-maps';

const App = () => {
  const [fetchError, setFetchError] = useState<string>('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 38.5789380221926,
    lng: -121.50225113309448,
  });

  const MapAPIKey = process.env.GOOGLE_MAPS_API_KEY;

  // fetch restaurant objects from database
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

  // create markers based on fetched restaurants
  useEffect(() => {
    if (restaurants.length > 0) {
      const newMarkers = restaurants.map((restaurant) => ({
        position: {
          lat: parseFloat(restaurant.latitude),
          lng: parseFloat(restaurant.longitude),
        },
        key: restaurant.name,
      }));
      setMarkers(newMarkers);
    }
  }, [restaurants]);

  const handleRestaurantClick = (lat: string, lng: string) => {
    setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
  };

  return (
    <div className="main">
      <Nav />
      <Routes>
        <Route
          path="/"
          element={
            <div className="content">
              <Restaurants
                restaurants={restaurants}
                fetchError={fetchError}
                onRestaurantClick={handleRestaurantClick}
              />
              {MapAPIKey && (
                <APIProvider
                  apiKey={MapAPIKey as string}
                  onLoad={() => console.log('Maps API has loaded.')}>
                  <Map
                    className="map-container"
                    defaultZoom={13}
                    center={mapCenter}
                    onCameraChanged={(ev: MapCameraChangedEvent) =>
                      console.log(
                        'camera changed:',
                        ev.detail.center,
                        'zoom:',
                        ev.detail.zoom
                      )
                    }>
                    {markers.map((marker, index) => (
                      <Marker
                        key={index}
                        position={marker.position}
                        title={marker.key}
                      />
                    ))}
                  </Map>
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
