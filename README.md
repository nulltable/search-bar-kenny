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
| 3 | /restaurants/{id} | GET | http://localhost:3030/restaurants/57 | Get  restaurant's  name, location, and cuisine |
| 4 | /restaurants/create/{id} | POST | http://localhost:3030/restaurants/create | Add new restaurant to database |
| 5 | /restaurants/update/{id} | PUT | http://localhost:3030/restaurants/update/17 | Given a restaurant id update that restaurant in database |
| 6 | /restaurants/delete/{id} | DELETE | http://localhost:3030/restaurants/delete/27 | Delete restaurant of id 27 from the database |
| 7 | /users/{id} | GET | http://localhost:3030/users/385 | Retrieve username for a given user id

### Status codes and Response objects

- GET (/cuisines) 
  HTTP status response of 200 when successfully retrieves all stored cuisines.
```javascript   
  [
    { id: 1, 
      name: 'Japanese' 
    },
    { id: 2, 
      name: 'Chinese' 
    },
    { id: 3, 
      name: 'New American' 
    },
    { id: 4, 
      name: 'Mexican' 
    },
    { id: 5, 
      name: 'Korean' 
    },
    { id: 6, 
      name: 'Indian' 
    },
    { id: 7, 
      name: 'French' 
    },
    { id: 8, 
    name: 'Taiwanese'
     }
  ]
```

- GET (/locations)
HTTP status response of 200 when successfully retrieves all locations
Snippet example of JSON structure:
```javascript 
  [ 
    {
      id: 100,
      city: 'West Kendrickside',
      county: 'Bedfordshire'
    }
  ]
```

- GET (/restaurants/:id)
HTTP response of 200 for successfully retrieiving restaurant's id, name, cuisine, and location

```javascript
  [
    {
      id: 99,
      name: 'Cupiditate',
      location: 'Buckinghamshire, Kaleighville',
      cuisine: 'Korean'
    }
  ]
```

- POST (/restaurants/create/:id)
HTTP response of 201 when successfully added a new restaurant to database
Request to add new restaurant needs the following in req.body:
```javascript
  {
    name: 'API bar and grill',
    cuisine: 'RESTful',
    location: 'Faker County, Lorem City'
  }
```

- DELETE (/restaurants/delete/:id)
HTTP response of 200 when request was successful and restaurant has been deleted from database


- UPDATE (/restaurants/update/:id)
HTTP response of 200 when request was successful and restaurant has been updated.
Requires updated values and the id in req.body:
```javascript
  [
    {
      id: 99,
      cuisine: 'Mediterranean'
    }
  ]
```

- GET (/users/:id)
HTTP response of 200 and returns username of requested user id
```javascript
  {username: 'mrFakeUser285'}
```