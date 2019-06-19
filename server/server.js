require('newrelic');
const express = require('express');
const redis = require('redis');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('../database/db.js');

const redisClient = redis.createClient();

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


app.get('/search', (req, res) => {
	res.status(200).send();
});


app.get('/search/restaurantsByName/:name', db.getRestaurantNameCache);
app.get('/search/restaurantsByCuisine/:cuisineId', db.getRestaurantCuisineCache);
app.get('/search/restaurantsByLocation/:location', db.getRestaurantsLocationCache);
app.get('/search/restaurantsByNameAndlocation', db.getRestaurantsNameLocationCache);
app.post('/search/postRestaurant', db.postRestaurant);
app.put('/search/updateRestaurant/:id', db.updateRestaurant);
app.delete('/search/deleteRestaurant/:id', db.deleteRestaurant);
app.post('/search/postSearchQuery', db.addSearchHistory);


module.exports = app;
