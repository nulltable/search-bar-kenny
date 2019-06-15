'use strict';


const Faker = require('faker');

const restaurants = ['qui', 'nemo', 'a', 'excepturi', 'deserunt', 'unde'];

const cuisineIds = [1, 2, 3, 4, 5, 6, 7, 8];

const locations = ['South Augustine', 'East Lyla', 'Reillyberg', 'Arelyhaven', 'Travonshire', 'Flossiehaven'];

function generateRandomData(userContext, events, done) {
	const randomRestaurantIndex = Math.floor(Math.random() * restaurants.length);
	const name = restaurants[randomRestaurantIndex];
	const randomCuisineIndex = Math.floor(Math.random() * cuisineIds.length);
	const cuisineId = cuisineIds[randomCuisineIndex];
	const location = locations[Math.floor(Math.random() * locations.length)];

	// console.log(cuisineId);
	userContext.vars.name = name;
	userContext.vars.cuisineId = cuisineId;
	userContext.vars.location = location;

	return done();
}

module.exports = {
	generateRandomData
};
