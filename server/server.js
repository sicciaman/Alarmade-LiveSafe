//Import Express
let express = require("express");
//Import routes
let apiRoutes = require('./api-routes');
// Import Body parser
let bodyParser = require('body-parser');
// Import Mongoose
let mongoose = require('mongoose');

// Initialize http server
let app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
//Connect to Mongoose and set connection variable
mongoose.connect('mongodb://localhost/alarmade', { useNewUrlParser: true });
const db = mongoose.connection;
// Added check for DB connection
if(!db)
    console.log("Error connecting db")
else
    console.log("Db connected successfully")


// Send message for default URL
app.get('/', (req, res) => res.send('Hello World with Express'));

// Use Api routes in the App
app.use('/api', apiRoutes);

// Use Api routes in the App
app.use('/api/secret', apiRoutes);

// Launch the server on port 3000
const server = app.listen(3000, () => {
  const { address, port } = server.address();
  console.log(`Listening at http:/localhost:${port}`);
});