# Project Name

> Project description

FreeSeats

## Related Projects

- https://github.com/freeseats/exzerone-search-bar
- https://github.com/freeseats/slhodak-reviews-and-impressions
- https://github.com/freeseats/Menu-Related-SideBar
- https://github.com/freeseats/matthewjdiaz1-photo-service
  - https://github.com/freeseats/wfong-service-reservations

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)
1. [Public APIs](#endpoints)

## Usage

> Some usage instructions
> Please create a database called 'search' in mysql prior in running the scripts;
> The Instruction is as follows:
> In Terminal,

1. type in command - \$mysql -u -p root
2. Enter your password if you have one
3. type in command - show databases
   to see your current databases.
4. type in command - create database search
5. type in command - use search
6. Under the server folder, go to db.js.
7. On line 13, change the third parameter of the function to the password you have set up to your mysql (it is currently 'student');
8. After all of the steps mentioned above, go ahead and install dependencies.
9. run command npm run seeding to seed the data to your database
10. run npm start to start up the server

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
npm run react-dev
npm start
```

In Chrome, go to localhost:3030.

## Endpoints

### CRUD API
| # | Route | Method | Full  Route | Description |
|---|---| --- | --- | --- |
| 1 | /locations | GET | http://localhost:3030/locations | Get all location data |
| 2 | /restaurants/{id} | GET | http://localhost:3030/restaurants/57 | Get  restaurant's  name, location, and cuisine |
| 3 | /restaurants/create/{id} | POST | http://localhost:3030/restaurants/create | Add new restaurant to database |
| 4 | /restaurants/update/{id} | PUT | http://localhost:3030/restaurants/update/17 | Given a restaurant id update that restaurant in database |
| 5 | /restaurants/delete/{id} | DELETE | http://localhost:3030/restaurants/delete/27 | Delete restaurant of id 27 from the database |
| 6 | /users/{id} | GET | http://localhost:3030/users/385 | Retrieve username for a given user id

### Status codes and Response objects


- GET (/restaurants/:name)
HTTP response of 200 for successfully retrieving restaurant's id, name, and location. Limited to 300 per request.

```javascript
  [
    {
        "id": 2,
        "name": "nemo",
        "location": "East Lyla"
    },
    {
        "id": 4,
        "name": "nemo",
        "location": "Reillyberg"
    },
    {
        "id": 7,
        "name": "nemo",
        "location": "South Augustine"
    },
  ]
```

- GET (/restaurants/cuisine/:cuisineId)
HTTP response of 200 for successfully retrieving restaurant's name, location, and type of cuisine. Limited to 300 per request.

Cuisine id's:
| id | cuisine |
|---|---|
|	1 |'Chinese', |
|	2 |'New American', |
|	3 |'Mexican', |
|	4 |'Korean', |
| 5 |'Indian', |
|	6 |'French', |
|	7 |'Taiwanese', |
| 8 |'Mediterranean', |
];

```javascript
  [
    {
        "name": "unde",
        "location": "Flossiehaven",
        "cuisine": "Chinese"
    },
    {
        "name": "qui",
        "location": "Travonshire",
        "cuisine": "Chinese"
    },
    {
        "name": "nemo",
        "location": "East Lyla",
        "cuisine": "Chinese"
    },
  ]
```

- GET (/restaurants/location/:location)
HTTP response of 200 for successfully retrieving all restaurants of the requested location. Displays restaurant's name, location, and type of cuisine. Limited to 300 per request.

```javascript
  [
    {
        "id": 6,
        "name": "excepturi",
        "location": "Travonshire"
    },
    {
        "id": 10,
        "name": "qui",
        "location": "Travonshire"
    },
    {
        "id": 16,
        "name": "deserunt",
        "location": "Travonshire"
    },
  ]
```

- GET (/restaurants/nameAndLocation/:name&:location)
HTTP response of 200 for successfully retrieving all restaurants of the requested name and location. Displays restaurant's name, location, and type of cuisine. Limited to 300 per request.

Request for name='nemo' and location = 'Travonshire':
```javascript
  [
    {
        "id": 9671,
        "name": "nemo",
        "location": "Travonshire"
    },
    {
        "id": 9675,
        "name": "nemo",
        "location": "Travonshire"
    },
    {
        "id": 9693,
        "name": "nemo",
        "location": "Travonshire"
    },
  ]
```

- POST (/restaurants/create/)
HTTP response of 201 when successfully added a new restaurant to database
Request to add new restaurant needs the following in req.body:
```javascript
  [
    {
      "name": 'API bar and grill',
      "cuisineId": 3,
      "location": 'Lorem City'
    }
  ]
```

- DELETE (/restaurants/delete/:id)
HTTP response of 200 when request was successful and restaurant has been deleted from database


- UPDATE (/restaurants/update/:id)
HTTP response of 200 when request was successful and restaurant has been updated.
Requires updated values and the id in req.body:
```javascript
  [
    {
      "name": 'new name',
      "cuisine": 'Mediterranean'
    }
  ]
```
- POST (searchhistory/create)
HTTP response of 201 when request was successful and search query has been added to database in the search_history table.

Requires user_id of existing user and a search_query string:
```javascript
[
  {
    "userId": 9999900,
    "searchQuery": "what's for dinner?"
  }
]
```