//main file to start the server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

dotenv.config();

const app = express();

if (!fs.existsSync(path.join(__dirname, '../uploads'))) {
    fs.mkdirSync(path.join(__dirname, '../uploads'), { recursive: true });
}

app.use(cors());
app.use(bodyParser.json()); 
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const routes = require('../routes');

app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;