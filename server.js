const express = require('express');
const path = require('path');
const proxy = require("http-proxy-middleware");

const app = express();

app.use(proxy('/api/**', { target: 'http://localhost:5000' }));

const baseDir = `${__dirname}/build/`;
app.use(express.static(`${baseDir}`));

app.get('/', (req,res) => res.sendFile('index.html' , { root : baseDir }))

app.get('/api/products', (req, res) => {
  res.sendFile(path.join(__dirname, 'products.json'));
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`server running on port ${process.env.PORT || 3001}`);
})