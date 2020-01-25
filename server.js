const express = require('express');
const path = require('path');

const app = express();

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.json'));
})

app.listen(3001, () => {
  console.log('server running on port 3001');
})