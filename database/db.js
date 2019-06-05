const Sequelize = require('sequelize');
// const mysql = require('mysql');
// const Search = require('./seeding');

// const connection = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'student'
// });

// connection.query('DROP DATABASE IF EXISTS Search', () => {});
// connection.query('CREATE DATABASE Search', () => {
const sequelize = new Sequelize('search', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	logging: false
});

sequelize
	.authenticate()
	.then(() => {
		console.log('Connection Has Been Established Successfully');
	})
	.catch((err) => {
		console.log(err);
	});

const Search = sequelize.define(
	'search',
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			allowNull: false
		},
		restaurants: Sequelize.STRING,
		locations: Sequelize.STRING,
		cuisines: Sequelize.STRING
	},
	{
		freezeTableName: true,
		tableName: 'search',
		timestamps: false
	}
);

// module.exports = sequelize;
module.exports = Search;
// });
