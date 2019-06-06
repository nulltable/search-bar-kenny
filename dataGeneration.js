const fs = require('fs');
const csvWriter = require('csv-write-stream');
const faker = require('faker');
const zlib = require('zlib');

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

function fakerSamples() {
	for (let i = 0; i < 10000; i++) {
		restaurants.push(faker.lorem.word());
		locations.push(`${faker.address.county()}, ${faker.address.city()}`);
	}
}

fakerSamples();

const compressData = (filePath) => {
	const gzip = zlib.createGzip();
	const inp = fs.createReadStream(filePath);
	const out = fs.createWriteStream(`${filePath}.gz`);
	inp.pipe(gzip).pipe(out);
};

const generateData = () => {
	writer.pipe(fs.createWriteStream('data.csv'));

	for (let i = 0; i < 1000000; i++) {
		const randomCuisineNumber = Math.floor(Math.random() * cuisine.length);
		const randomNumber = Math.floor(Math.random() * restaurants.length);

		const randomCuisine = cuisine[randomCuisineNumber];
		const randomRestaurant = restaurants[randomNumber];
		const randomLocation = locations[randomNumber];
		writer.write({
			id: counter++,
			restaurants: randomRestaurant.charAt(0).toUpperCase() + randomRestaurant.slice(1),
			locations: randomLocation,
			cuisines: randomCuisine,
		});
		if (counter % 100000 === 0) {
			console.log(counter);
		}
	}
	writer.end();
	console.log('done');
};

// After .csv file has been created, compress the .csv file into a // gzip file
generateData();
compressData('data.csv');
