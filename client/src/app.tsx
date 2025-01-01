import { useEffect, useState } from 'react';
import Nav from './components/Nav';
import Restaurants from './components/Restaurants';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import WriteReview from './components/WriteReview';
import ReviewEntries from './components/ReviewEntries';
import { Restaurant } from './types/interface';
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
  InfoWindow,
} from '@vis.gl/react-google-maps';

const App = () => {
  const [fetchError, setFetchError] = useState<string>('');
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 38.5789380221926,
    lng: -121.50225113309448,
  });
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [selectedMarker, setSelectedMarker] = useState<Restaurant | null>(null);

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

  // check auth status on app load
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch('/api/check-auth', {
          credentials: 'include',
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
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
        restaurant: restaurant,
      }));
      setMarkers(newMarkers);
    }
  }, [restaurants]);

  const handleRestaurantClick = (lat: string, lng: string) => {
    setMapCenter({ lat: parseFloat(lat), lng: parseFloat(lng) });
  };

  const handleMarkerClick = (restaurant: Restaurant) => {
    setSelectedMarker(restaurant);
  };

  const handleWindowClose = () => {
    setSelectedMarker(null);
  };

  // handle user login
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  // handle user logout
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        setIsAuthenticated(false);
        console.log('User logged out successfully');
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      }
      console.error('An error occurred when logging out user: ', error);
    }
  };

  return (
    <div className="main">
      <Nav isAuthenticated={isAuthenticated} onLogout={handleLogout} />
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
                    defaultCenter={mapCenter}
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
                        onClick={() => handleMarkerClick(marker.restaurant)}
                      />
                    ))}
                    {selectedMarker && (
                      <InfoWindow
                        position={{
                          lat: parseFloat(selectedMarker.latitude),
                          lng: parseFloat(selectedMarker.longitude),
                        }}
                        onCloseClick={handleWindowClose}>
                        <div className="p-2">
                          <h3 className="font-bold">{selectedMarker.name}</h3>
                          <p>{selectedMarker.address}</p>
                        </div>
                      </InfoWindow>
                    )}
                  </Map>
                </APIProvider>
              )}
            </div>
          }
        />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
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
