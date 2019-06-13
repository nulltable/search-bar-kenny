const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');

const writer = csvWriter();

let counter = 1;
let restaurantId = 0;
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
		locations.push([faker.address.city()]);
		usernames.push([faker.internet.userName()]);
	}
}

fakerSamples();


const generateRestaurantData = () => {
	writer.pipe(fs.createWriteStream('test_restaurant_data.csv'));

	let i = 0;
	function write() {
		let ok = true;

		while (i < 10000000 && ok) {
			i++;
			const randomNumber = Math.floor(Math.random() * restaurants.length);
			const randomRestaurant = restaurants[randomNumber];
			const randomLocation = locations[randomNumber];

			if (i === 9999999) {
				writer.write({
					id: counter++,
					name: randomRestaurant.charAt(0).toUpperCase() + randomRestaurant.slice(1),
					city: randomLocation[0],
				}, console.log('finished writing'));
			} else {
				ok = writer.write({
					id: counter++,
					name: randomRestaurant.charAt(0).toUpperCase() + randomRestaurant.slice(1),
					city: randomLocation[0],
				});
			}
			if (counter % 100000 === 0) {
				console.log(counter);
			}
		}
		if (i < 10000000) {
			writer.once('drain', write);
		}
	}
	write();
};

// generateRestaurantData();

// const generateLocationData = () => {
// 	writer.pipe(fs.createWriteStream('location_data.csv'));

// 	let i = 0;
// 	function write() {
// 		let ok = true;
// 		while (i < 10000000 && ok) {
// 			i++;
// 			const randomNumber = Math.floor(Math.random() * restaurants.length);
// 			const randomLocation = locations[randomNumber];
// 			if (i === 9999999) {
// 				writer.write({
// 					id: counter++,
// 					city: randomLocation[0],
// 					county: randomLocation[1]
// 				}, console.log('finish writing'));
// 			} else {
// 				ok = writer.write({
// 					id: counter++,
// 					city: randomLocation[0],
// 					county: randomLocation[1]
// 				});
// 				if (counter % 100000 === 0) {
// 					console.log(counter);
// 				}
// 			}
// 		}
// 		if (i < 10000000) {
// 			writer.once('drain', write);
// 		}
// 	}
// 	write();
// };

// generateLocationData();

const generateCuisineData = () => {
	writer.pipe(fs.createWriteStream('cuisine_data.csv'));

	let i = 0;
	function write() {
		let ok = true;
		while (i < cuisine.length - 1 && ok) {
			i++;
			if (i === cuisine.length - 1) {
				writer.write({
					id: counter++,
					cuisine: cuisine[i]
				}, console.log('finished writing'));
			} else {
				ok = writer.write({
					id: counter++,
					cuisine: cuisine[i]
				});
			}
			console.log(i);
		}
		if (i < cuisine.length) {
			writer.once('drain', write);
		}
	}
	write();
};

// generateCuisineData();

const generateUsersData = () => {
	const usersWriter = csvWriter();

	usersWriter.pipe(fs.createWriteStream('users_data.csv'));
	let i = 0;
	function write() {
		let ok = true;
		while (i < 1000000 && ok) {
			i++;
			const randomNumber = Math.floor(Math.random() * usernames.length);

			if (i === 999999) {
				usersWriter.write({
					id: counter++,
					username: usernames[randomNumber]
				}, console.log('finished writing'));
			} else {
				ok = usersWriter.write({
					id: counter++,
					username: usernames[randomNumber]
				});
				if (i % 100000 === 0) {
					console.log(i);
				}
			}
		}
		if (i < 1000000) {
			usersWriter.once('drain', write);
		}
	}
	write();
	// usersWriter.end();

	// console.log('done');
};

// generateUsersData();

const generateSearchHistoryData = () => {
	const searchHistoryWriter = csvWriter();
	const file = fs.createWriteStream('search_history_data.csv');
	searchHistoryWriter.pipe(file);
	let randomQuery;
	let i = 50000000;

	function write() {
		let ok = true;
		do {
			i--;

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

			if (i === 0) {
				searchHistoryWriter.write({
					id: counter++,
					user_id: Math.floor(Math.random() * (1000000 - 1) + 1),
					search_query: randomQuery
				}, console.log('finished writing'));
			} else {
				ok = searchHistoryWriter.write({
					id: counter++,
					user_id: Math.floor(Math.random() * (1000000 - 1) + 1),
					search_query: randomQuery
				});

				if (i % 100000 === 0) {
					console.log(i);
				}
			}
		} while (i > 0 && ok);
		if (i > 0) {
			searchHistoryWriter.once('drain', write);
		}
	}
	write();

	// searchHistoryWriter.end();
};

// generateSearchHistoryData();

const generateRestaurantCuisineData = () => {
	writer.pipe(fs.createWriteStream('restaurant_cuisine_data.csv'));

	let i = 0;
	function write() {
		let ok = true;

		while (restaurantId < 10000000 && ok) {
			i++;
			restaurantId++;
			const numberOfCuisines = Math.floor(Math.random() * (3 - 1) + 1);
			const cuisine1 = Math.floor(Math.random() * (8 - 1) + 1);
			if (restaurantId === 9999999) {
				writer.write({
					id: i,
					restaurant_id: restaurantId,
					cuisine_id: cuisine1
				}, console.log('finished writing'));
			} else if (numberOfCuisines === 2) {
				let cuisine2 = cuisine1;
				if (cuisine1 === cuisine.length) {
					cuisine2 = 0;
				} else {
					cuisine2 += 1;
				}
				writer.write({
					id: i,
					restaurant_id: restaurantId,
					cuisine_id: cuisine1
				});
				writer.write({
					id: i += 1,
					restaurant_id: restaurantId,
					cuisine_id: cuisine2
				});
			} else {
				ok = writer.write({
					id: i,
					restaurant_id: restaurantId,
					cuisine_id: cuisine1
				});
			}
			if (restaurantId % 100000 === 0) {
				console.log(restaurantId);
			}
		}
		if (restaurantId < 1000000) {
			writer.once('drain', write);
		}
	}
	write();
};

generateRestaurantCuisineData();

const generateCassandraCSVData = () => {
	writer.pipe(fs.createWriteStream('cassandra_data.csv'));

	let randomQuery;
	let i = 0;
	function write() {
		let ok = true;

		while (i < 50000000 && ok) {
			i++;
			const whichRandomQuery = Math.floor(Math.random() * 3);
			const randomNumber = Math.floor(Math.random() * restaurants.length);
			const randomUsername = usernames[Math.floor(Math.random() * usernames.length)];
			const randomRestaurant = restaurants[randomNumber];
			const randomLocation = locations[randomNumber];

			const numberOfCuisines = Math.floor(Math.random() * (3 - 1) + 1);
			const firstCuisine = Math.floor(Math.random() * (8 - 1) + 1);
			let secondCuisine = firstCuisine;
			if (numberOfCuisines === 2) {
				if (firstCuisine === cuisine.length) {
					secondCuisine = 0;
				} else {
					secondCuisine += 1;
				}
			} else {
				secondCuisine = 'none';
			}

			if (whichRandomQuery === 0) {
				randomQuery = cuisine[firstCuisine];
			} else if (whichRandomQuery === 1) {
				randomQuery = randomRestaurant;
			} else if (whichRandomQuery === 2) {
				randomQuery = randomLocation;
			}

			const writeObject = {
				id: counter++,
				name: randomRestaurant.charAt(0).toUpperCase() + randomRestaurant.slice(1),
				city: randomLocation[0],
				cuisine1: firstCuisine,
				cuisine2: secondCuisine,
				username: randomUsername,
				search_query: randomQuery
			};

			if (i === 49999999) {
				writer.write(writeObject, console.log('finished writing'));
			} else {
				ok = writer.write(writeObject);
			}
			if (counter % 100000 === 0) {
				console.log(counter);
			}
		}
		if (i < 50000000) {
			writer.once('drain', write);
		}
	}
	write();
};

// generateCassandraCSVData();
