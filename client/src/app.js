import React from 'react';
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import Nav from './contents/Nav';
import Restaurants from './contents/Restaurants';
import MyGoogleMap from './contents/GoogleMap';

// const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

// const App = () => (
//   <APIProvider apiKey={API_KEY}>
//     <Map
//       style={{ width: '100%', height: '400px' }}
//       defaultCenter={{ lat: 22.54992, lng: 0 }}
//       defaultZoom={3}
//       gestureHandling={'greedy'}
//       disableDefaultUI={true}
//     />
//   </APIProvider>
// );

const App = () => {
  return (
    <div className="main">
      <Nav />
      <div className="content">
        <Restaurants />
        <MyGoogleMap />
      </div>
    </div>
  );
};

export default App;
