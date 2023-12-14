const express = require('express');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

const baseDir = `${__dirname}/build/`;
app.use(express.static(`${baseDir}`));

app.get('/', (req,res) => res.sendFile('index.html' , { root : baseDir }))

app.get('/api/**', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.sendFile(path.join(__dirname, '/build/data/', 'products.json'));
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`server running on port ${process.env.PORT || 3001}`);
})