const { Pool, } = require('pg');

// connection.query('DROP DATABASE IF EXISTS Search', () => {});
// connection.query('CREATE DATABASE Search', () => {
const pool = new Pool({
	user: '',
	host: 'localhost',
	database: 'search',
	password: '',
	port: 5432
});


const getRestaurantsByName = (request, response) => {
	const { name } = request.params;
	pool.query('SELECT * FROM restaurants WHERE name = $1 LIMIT 300;', [name], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getRestaurantsByCuisine = (request, response) => {
	const { cuisineId } = request.params;

	const query = 'select restaurants.name, restaurants.location, cuisines.cuisine from restaurants inner join restaurants_cuisines ON restaurants.id = restaurants_cuisines.restaurant_id INNER JOIN cuisines on restaurants_cuisines.cuisine_id = cuisines.id  WHERE restaurants_cuisines.cuisine_id=$1 limit 300;';
	pool.query(query, [cuisineId], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getRestaurantsByLocation = (request, response) => {
	const { location } = request.params;

	const query = 'select * from restaurants where location = $1 limit 300';
	pool.query(query, [location], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const getRestaurantsByNameAndLocation = (request, response) => {
	const { name, location } = request.params;

	pool.query('SELECT * FROM restaurants WHERE name = $1 AND location = $2 LIMIT 300;', [name, location], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
};

const postRestaurant = (request, response) => {
	const { name, location, cuisineId } = request.body[0];
	let restaurantId;
	const query1 = 'INSERT INTO restaurants (name, location) VALUES ($1, $2) RETURNING *';
	const query2 = 'INSERT INTO restaurants_cuisines (restaurant_id, cuisine_id) VALUES ($1, $2)';
	pool.query(query1, [name, location], (error, result) => {
		if (error) {
			throw error;
		} else {
			restaurantId = result.rows[0].id;
			console.log(restaurantId);
			pool.query(query2, [restaurantId, cuisineId], () => {
				if (error) {
					throw error;
				}
			});
			response.status(201).send('Restaurant id and cuisine id added!');
		}
	});
};

const updateRestaurant = (request, response) => {
	const id = parseInt(request.params.id, 10);
	const { name, location } = request.body[0];

	pool.query('UPDATE restaurants SET name = $1, location = $2 WHERE id = $3', [name, location, id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`Restaurant updated of id: ${id}`);
	});
};

const deleteRestaurant = (request, response) => {
	const id = parseInt(request.params.id, 10);

	pool.query('DELETE FROM restaurants WHERE id = $1', [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`Restaurant deleted of ID: ${id}`);
	});
};

const addSearchHistory = (request, response) => {
	const { userId, searchQuery } = request.body[0];

	console.log(userId, searchQuery);
	pool.query('INSERT INTO search_history (user_id, search_query) VALUES ($1, $2)', [userId, searchQuery], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(201).send('Added search query to search history table!');
	});
};


module.exports = {
	pool,
	getRestaurantsByName,
	getRestaurantsByCuisine,
	getRestaurantsByLocation,
	getRestaurantsByNameAndLocation,
	postRestaurant,
	updateRestaurant,
	deleteRestaurant,
	addSearchHistory,
};
