const express = require('express');
const path = require('path');
const proxy = require("http-proxy-middleware");

const app = express();

app.use(proxy('/api/**', { target: 'http://localhost:5000' }));

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.json'));
})

app.listen(process.env.PORT || 3001, () => {
  console.log('server running on port 3001');
})