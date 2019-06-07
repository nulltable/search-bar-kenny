const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const zlib = require('zlib');
const path = require('path');

const writer = csvWriter();

let counter = 0;
const cuisine = [
	'Japanese',
	'Chinese',
	'New American',
	'Mexican',
	'Korean',
	'Indian',
	'French',
	'Taiwanese',
	'Mediterranean',
];
const restaurants = [];
const locations = [];
const usernames = [];

function fakerSamples() {
	for (let i = 0; i < 10000; i++) {
		restaurants.push(faker.lorem.word());
		locations.push([faker.address.county(), faker.address.city()]);
		usernames.push([faker.internet.userName()]);
	}
}

fakerSamples();

// attempt to write compression helper function
// const compressData = (filePath) => {
// 	const gzip = zlib.createGzip();
// 	const inp = fs.createReadStream(filePath);
// 	const out = fs.createWriteStream(`${filePath}.gz`);
// 	inp.pipe(gzip).pipe(out);
// };

const generateRestaurantData = () => {
	writer.pipe(fs.createWriteStream('restaurant_data.csv'));

	for (let i = 0; i < 10000000; i++) {
		const randomNumber = Math.floor(Math.random() * restaurants.length);

		const randomRestaurant = restaurants[randomNumber];
		writer.write({
			id: counter++,
			name: randomRestaurant.charAt(0).toUpperCase() + randomRestaurant.slice(1),
		});
		if (counter % 100000 === 0) {
			console.log(counter);
		}
	}
	writer.end();
	console.log('done');
};

// generateRestaurantData();

const generateLocationData = () => {
	writer.pipe(fs.createWriteStream('location_data.csv'));

	for (let i = 0; i < 10000000; i++) {
		const randomNumber = Math.floor(Math.random() * restaurants.length);

		const randomLocation = locations[randomNumber];
		writer.write({
			id: counter++,
			city: randomLocation[0],
			county: randomLocation[1]
		});
		if (counter % 100000 === 0) {
			console.log(counter);
		}
	}
	writer.end();
	console.log('done');
};

// generateLocationData();

const generateCuisineData = () => {
	writer.pipe(fs.createWriteStream('cuisine_data.csv'));

	for (let i = 0; i < 10000000; i++) {
		const randomNumber = Math.floor(Math.random() * cuisine.length);
		writer.write({
			id: counter++,
			cuisine: cuisine[randomNumber]
		});
		if (counter % 100000 === 0) {
			console.log(counter);
		}
	}
	writer.end();
	console.log('done');
};

// generateCuisineData();

const generateUsersData = () => {
	const usersWriter = csvWriter();

	usersWriter.pipe(fs.createWriteStream('users_data.csv'));

	for (let i = 0; i < 1000000; i++) {
		const randomNumber = Math.floor(Math.random() * usernames.length);
		usersWriter.write({
			id: counter++,
			username: usernames[randomNumber]
		});
		if (counter % 100000 === 0) {
			console.log(counter);
		}
	}
	usersWriter.end();

	console.log('done');
};

// generateUsersData();

const generateSearchHistoryData = () => {
	const searchHistoryWriter = csvWriter();
	searchHistoryWriter.pipe(fs.createWriteStream('search_history_data.csv'));
	let randomQuery;

	for (let i = 0; i < 50000000; i++) {
		const randomNumber = Math.floor(Math.random() * 3);
		const randomCuisineNumber = Math.floor(Math.random() * cuisine.length);
		const randomRestaurantNumber = Math.floor(Math.random() * restaurants.length);
		const randomLocationNumber = Math.floor(Math.random() * locations.length);

		if (randomNumber === 0) {
			randomQuery = cuisine[randomCuisineNumber];
		} else if (randomNumber === 1) {
			randomQuery = restaurants[randomRestaurantNumber];
		} else if (randomNumber === 2) {
			randomQuery = locations[randomLocationNumber];
		}
		searchHistoryWriter.write({
			id: counter++,
			user_id: Math.floor(Math.random() * 1000000),
			search_query: randomQuery
		});
		if (counter % 100000 === 0) {
			console.log(counter);
		}
	}
	searchHistoryWriter.end();
};

generateSearchHistoryData();
