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
git clone https://github.com/seneyu/solo-project.git
```

2. Install dependencies:

```bash
npm install
```

3. Set up `.env` file for the following items:

- GOOGLE_MAPS_API_KEY
- MONGO_URI
- JWT_SECRET
- JWT_REFRESH_SECRET

4. Set up and connect to your MongoDB database. Navigate to ./server/seeds.ts and run the file to create seed restaurants and reviews in your database.

5. Start the server:

```bash
npm run start
```

6. Open your browser and navigate to `http://localhost:8080`.
