const express = require("express");
const sequelize = require('./app/config/db.config');
const User = require('./app/models/User');
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const fs = require('fs');
const https = require('https');
require('dotenv').config(); 
var corsOptions = {
    origin: "*"
}; 
app.use(bodyParser.json());
app.use(cors(corsOptions));

const privateKey = fs.readFileSync('./server.key', 'utf8');
const certificate = fs.readFileSync('./server.crt', 'utf8');


const credentials = {
  key: privateKey,
  cert: certificate,
  passphrase: '123456'
};
  require("./app/routes/auth.routes")(app);
  const PORT = process.env.PORT || 3000;

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`); 
  });
