require('newrelic');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../database/db.js');


// DB connection
db.pool.connect((err, client, done) => {
	console.log('Connected to database!');
	done();
});

const app = express();

app.use(cors());
// app.use(morgan('dev'));
app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());
app.use(express.static('public'));


app.get('/', (req, res) => {
	res.status(200).send();
});


app.get('/restaurants/:name', db.getRestaurantsByName);
app.get('/restaurants/cuisine/:cuisineId', db.getRestaurantsByCuisine);
app.get('/restaurants/location/:location', db.getRestaurantsByLocation);
app.get('/nameAndlocation', db.getRestaurantsByNameAndLocation);
app.post('/postRestaurant', db.postRestaurant);
app.put('/updateRestaurant/:id', db.updateRestaurant);
app.delete('/deleteRestaurant/:id', db.deleteRestaurant);
app.post('/postSearchQuery', db.addSearchHistory);


module.exports = app;
