import RestaurantCard from './RestaurantCard';
import { Restaurant } from '../types/interface';

interface RestaurantsProps {
  restaurants: Restaurant[];
  fetchError: string;
  onRestaurantClick: (lat: string, lng: string) => void;
}

const Restaurants: React.FC<RestaurantsProps> = ({
  restaurants,
  fetchError,
  onRestaurantClick,
}) => {
  return (
    <div>
      {fetchError && <p>{fetchError}</p>}
      {restaurants && (
        <div className="restaurants">
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
                onRestaurantClick={onRestaurantClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
