import mongoose from 'mongoose';
import { Restaurant, Review } from './models/db';
import dotenv from 'dotenv';
dotenv.config();

const URI = process.env.MONGO_URI as string;

async function main() {
  try {
    await mongoose
      .connect(URI)
      .then(() => console.log('Connected to MongoDB...'))
      .catch((err) => console.error('MongoDB connection error: ', err));

    const Restaurants = [
      {
        name: 'The Kitchen',
        address: '915 Broadway, Ste. 100, Sacramento, 95818, USA',
        cuisine: '$$$$ · Contemporary, Californian',
        distinction: 1,
        description:
          'After more than 30 years of operation, The Kitchen has upgraded to a grander space, but its raucous party atmosphere, led by energetic emcee Chef Kelly McCown, is the same as ever. Diners are encouraged to get up and walk around, even to wander through the kitchen and rub elbows with the cooks. Really like that truffle dish? The chef, who frequently proclaims the menu’s caloric impact, nonetheless invites you to ask for seconds. The menu changes monthly and features far-reaching inspiration while highlighting the Central Valley’s treasure trove of ingredients. Expect dishes like sweet potato cannelloni with brown butter sabayon, or perfectly seared scallops paired with cauliflower, blood orange, and lime leaf—and remember that the central premise is to have fun.',
        website: 'https://thekitchenrestaurant.com/',
        number: '+1 916-568-7171',
      },
      {
        name: 'Localis',
        address: '2031 S. St., Sacramento, 95811, USA',
        cuisine: '$$$$ · Californian, Contemporary',
        distinction: 1,
        description:
          'Together with his tight-knit team, Chef/owner Christopher Barnum-Dann brings unusual warmth to this intimate setting. His enthusiasm is instantly palpable as he happily explains his inspiration behind particular dishes and even solicits feedback. This is especially true for diners who sit at the spacious counter. The freewheeling tasting menu is thoroughly Californian in its commitment to carefully sourced ingredients, while also drawing upon global cuisines, reimagining flavors from the chef\'s travels with impressive imagination. Whimsy is a common thread throughout, as in a puffed pillow of crisp potato filled with "Fancy French Onion Dip" and caviar, or "The Dish That Made Us," a single woodfire-roasted octopus tentacle with black peppercorn sauce and pickled cherries.',
        website: 'https://localissacramento.com/',
        number: '+1 916-737-7699',
      },
      {
        name: 'Kenzo',
        address: '1339 Pearl St., Napa, 94559, USA',
        cuisine: '$$$$ · Japanese',
        distinction: 1,
        description:
          "Kenzo Tsujimoto's Napa Valley temple of traditional Japanese cuisine is a place to wash away worldly cares. Designed by his wife Natsuko, this 25-seat space is serene and minimal. The best seats are at the long counter, where diners can chat with the chefs and watch their meal being prepared. The kaiseki experience is beautifully composed, elegantly paced and may feature such exquisite presentations as the seasonal hassun—unveiling poached eggplant in dashi and seared Sonoma duck breast. Other standouts include straw-smoked Hokkaido scallop sashimi with jidori egg yolk sauce; and Wagyu beef tenderloin with a reduction of the estate's own Bordeaux-style blend. The sake variety is extraordinary, but Kenzo Estate’s own Napa-grown wines are also available by the flight.",
        website: 'https://www.kenzonapa.com/',
        number: '+1 707-294-2049',
      },
    ];

    const Reviews = [
      {
        restaurant: 'Localis',
        rating: 4,
        comment:
          "One of the best and most memorable dining experiences I've had in Sacramento! The service was excellent, and the waiters and waitresses were humble, kind, and made us feel comfortable!",
      },
      {
        restaurant: 'Auberge du Soleil',
        rating: 4,
        comment:
          'Beautiful upscale Michelin star restaurant with sweeping views of Napa Valley. The brunch is a good value, and includes a cocktail, bread course, and three food courses... several of which are the same as the ones on the dinner menu.',
      },
      {
        restaurant: 'The French Laundry',
        rating: 3,
        comment:
          'So disappointed by our experience here. Maybe we built it up too much before our trip but the service was just lackluster. I think they have become comfortable being a 3-star.',
      },
    ];

    const result1 = await Restaurant.insertMany(Restaurants);
    const result2 = await Review.insertMany(Reviews);
    console.log('Inserted result1: ', result1);
    console.log('Inserted result2: ', result2);
  } catch (error) {
    console.error('Error: ', error);
  } finally {
    await mongoose.disconnect();
  }
}

main();
