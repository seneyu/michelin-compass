const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (res, req) => {
  res.sendFile(path.join(__dirname, '../client/public/index.html'));
});

// catch-all error handler to handle unknown routes
app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

module.exports = app;
