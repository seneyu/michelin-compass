import RestaurantCard from '../components/RestaurantCard';
import { Restaurant } from '../types/interface';

interface RestaurantsProps {
  restaurants: Restaurant[];
  fetchError: string;
}

const Restaurants: React.FC<RestaurantsProps> = ({
  restaurants,
  fetchError,
}) => {
  return (
    <div className="">
      {fetchError && <p>{fetchError}</p>}
      {restaurants && (
        <div className="restaurants">
          <div className="restaurant-grid">
            {restaurants.map((restaurant) => (
              <RestaurantCard key={restaurant._id} restaurant={restaurant} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Restaurants;
