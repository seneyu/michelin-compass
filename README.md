# Michelin Compass

An application for reviewing Michelin-starred restaurants, allowing users to view listed restaurants on a map, leave reviews, and manage their content securely.

## Features

1. View Restaurants: Use Google Maps to locate listed Michelin restaurants
2. Leave Reviews: Create, read, update, and delete reviews for listed restaurants (CRUD functionality)
3. Protected Modifications: Review modifications are secured with JWT authorization

## Tech Stack

- Language: JavaScript, TypeScript
- Front-End: React
- Back-End: Node.js, Express.js
- Database: MongoDB
- APIs: Google Maps

## Installation and Usage

1. Clone the repo:

```bash
git clone https://github.com/seneyu/michelin-compass.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up an `.env` file with the required items, following these steps:

Create a file named `.env` in the project's root directory. Add the following lines to your `.env` file.

```text
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
MONGO_URI=your_mongodb_connection_string_here
JWT_SECRET=generated_jwt_secret_here
JWT_REFRESH_SECRET=generated_jwt_refresh_secret_here
```

Generate JWT secrets using the Node.js crypto package:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. Set up and connect to your MongoDB database. Navigate to ./server/seeds.ts and run the file to create seed restaurants and reviews in your database.

5. Start the server:

```bash
npm run start
```

6. Open your browser and navigate to `http://localhost:8080`.
