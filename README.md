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
| 1 | /cuisines | GET |  http://localhost:3030/cuisines | Get all cuisine data |
| 2 | /locations | GET | http://localhost:3030/locations | Get all location data |
| 3 | /search/{id} |GET | http://localhost:3030/search | Get data for one restaurant |
| 4 | /search/create | POST | http://localhost:3030/search | Create new search query to user's browser history |
| 5 | /search/{id} | DELETE | http://localhost:3030/search | Delete search query from user's browser history |
| 6 | /restaurants | GET | http://localhost:3030/restaurants | Get all restaurant data with restaurant name, location, and cuisine |
| 7 | /restaurants/{id} | POST | http://localhost:3030/restaurants | Create a new restaurant listing in database |
| 8 | /restaurants/{id} | PUT | http://localhost:3030/restaurants | Update a restaurant in database |
| 9 | /restaurants/{id} | DELETE | http://localhost:3030/restaurants |Delete a restaurant in database |

