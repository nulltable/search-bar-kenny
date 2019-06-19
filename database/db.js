const { Pool, } = require('pg');
const redis = require('redis');

const redisClient = redis.createClient();


const pool = new Pool({
	user: 'power_user',
	//host: 'localhost',
	host: '52.54.240.229',
	database: 'snowplow',
	password: 'power_user',
	port: 5432
});

const getRestaurantsByName = (request, response) => {
	// console.log('body:', request.body.name);
	// const name = request.body.name;
	const { name } = request.params;
	// console.log('REQUEST body', request.params);
	pool.query('SELECT * FROM restaurants WHERE name = $1 LIMIT 300;', [name], (error, results) => {
		if (error) {
			throw error;
		} else {
			const restaurantsByName = results.rows;
			if (name === 'qui' || name === 'nemo') {
				redisClient.setex(name, 3600, JSON.stringify(restaurantsByName));
			}
			// console.log('getRestaurantsByName Invoked')
			// console.log('results', results.rows);
			response.status(200).send(restaurantsByName);
			// response.status(200).json(results.rows);
		}
	});
};

const getRestaurantNameCache = (req, res) => {
	const { name } = req.params;

	redisClient.get(name, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			getRestaurantsByName(req, res);
		}
	});
};

const getRestaurantsByCuisine = (request, response) => {
	const { cuisineId } = request.params;

	// console.log('request params', request.params);
	const query = 'select restaurants.name, restaurants.location, cuisines.cuisine from restaurants inner join restaurants_cuisines ON restaurants.id = restaurants_cuisines.restaurant_id INNER JOIN cuisines on restaurants_cuisines.cuisine_id = cuisines.id  WHERE restaurants_cuisines.cuisine_id=$1 limit 300;';
	pool.query(query, [cuisineId], (error, results) => {
		if (error) {
			throw error;
		} else {
			const restaurantsByCuisine = results.rows;
			if (cuisineId === '4' || cuisineId === '6') {
				redisClient.setex(cuisineId, 3600, JSON.stringify(restaurantsByCuisine));
			}
			response.status(200).send(restaurantsByCuisine);
		}
	});
};

const getRestaurantCuisineCache = (req, res) => {
	const { cuisineId } = req.params;

	redisClient.get(cuisineId, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			getRestaurantsByCuisine(req, res);
		}
	});
};

const getRestaurantsByLocation = (request, response) => {
	const { location } = request.params;

	// console.log(request.params);
	const query = 'select * from restaurants where location = $1 limit 300';
	pool.query(query, [location], (error, results) => {
		if (error) {
			throw error;
		}
		// console.log(results.rows);
		const restaurantsByLocation = results.rows;
		if (location === 'Travonshire' || location === 'Flossiehaven') {
			redisClient.setex(location, 3600, JSON.stringify(restaurantsByLocation));
		}
		response.status(200).send(restaurantsByLocation);
	});
};

const getRestaurantsLocationCache = (req, res) => {
	const { location } = req.params;

	redisClient.get(location, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			getRestaurantsByLocation(req, res);
		}
	});
};

const getRestaurantsByNameAndLocation = (req, res) => {
	const { name, location } = req.params;
	const sql = 'SELECT * FROM restaurants WHERE name = $1 AND location = $2 LIMIT 300;';
	pool.query(sql, [name, location], (error, results) => {
		if (error) {
			res.status(400).send('could not get!');
		}
		const restaurantsByNameAndLocation = results.rows;

		if ((name === 'nemo') || (name === 'qui')) {
			if (location === 'Flossiehaven' || location === 'Travonshire') {
				redisClient.setex(name + location, 3600, JSON.stringify(restaurantsByNameAndLocation));
			}
		}
		res.status(200).json(restaurantsByNameAndLocation);
	});
};

const getRestaurantsNameLocationCache = (req, res) => {
	const { name, location } = req.params;

	redisClient.get(name + location, (err, result) => {
		if (result) {
			res.send(result);
		} else {
			getRestaurantsByNameAndLocation(req, res);
		}
	});
};

const postRestaurant = (request, response) => {
	const { name, location, cuisineId } = request.body;
	let restaurantId;
	const query1 = 'INSERT INTO restaurants (name, location) VALUES ($1, $2) RETURNING *';
	const query2 = 'INSERT INTO restaurants_cuisines (restaurant_id, cuisine_id) VALUES ($1, $2)';
	pool.query(query1, [name, location], (error, result) => {
		if (error) {
			throw error;
		} else {
			restaurantId = result.rows[0].id;
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
	const { name, location } = request.body;

	const query = 'UPDATE restaurants SET name = $1, location = $2 WHERE id = $3';
	pool.query(query, [name, location, id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`Restaurant updated of id: ${id}`);
	});
};

const deleteRestaurant = (request, response) => {
	const id = parseInt(request.params.id, 10);
	// console.log('hi');
	const query = 'DELETE FROM restaurants WHERE id = $1';
	pool.query(query, [id], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`Restaurant deleted of ID: ${id}`);
	});
};

const addSearchHistory = (request, response) => {
	const { userId, searchQuery } = request.body;
	// console.log(userId, searchQuery);
	const query = 'INSERT INTO search_history (user_id, search_query) VALUES ($1, $2)';
	pool.query(query, [userId, searchQuery], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(201).send('Added search query to search history table!');
	});
};


module.exports = {
	pool,
	getRestaurantNameCache,
	getRestaurantCuisineCache,
	getRestaurantsLocationCache,
	getRestaurantsNameLocationCache,
	postRestaurant,
	updateRestaurant,
	deleteRestaurant,
	addSearchHistory,
};
