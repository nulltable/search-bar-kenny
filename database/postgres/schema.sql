-- ---
-- Table 'Restaurants'
-- 
-- ---

DROP TABLE IF EXISTS Restaurants CASCADE;
		
CREATE TABLE Restaurants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  location VARCHAR(255) NOT NULL
);

-- ---
-- Table 'Cuisines'
-- 
-- ---

DROP TABLE IF EXISTS Cuisines CASCADE;
		
CREATE TABLE Cuisines (
  id SERIAL PRIMARY KEY,
  cuisine VARCHAR(25) NOT NULL
);

-- SELECT setval(pg_get_serial_sequence('Cuisines', 'id'), coalesce(max(id),1), false) FROM Cuisines;


-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS Users CASCADE;
		
CREATE TABLE Users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL
);

-- ---
-- Table 'search history'
-- 
-- ---

DROP TABLE IF EXISTS Search_History;
		
CREATE TABLE Search_History (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL,
  search_query VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS Restaurants_Cuisines;

CREATE TABLE Restaurants_Cuisines (
  id SERIAL PRIMARY KEY,
  restaurant_id INT NOT NULL,
  cuisine_id INT NOT NULL
);



COPY Restaurants(id, name, location)
FROM '/Users/kenny/Documents/hrsf/search-bar-kenny/restaurantprocessed.csv'
DELIMITER ',' CSV HEADER;

COPY Cuisines(id, cuisine)
FROM '/Users/kenny/Documents/hrsf/search-bar-kenny/test_cuisine_data.csv'
DELIMITER ',' CSV HEADER;

COPY Users(id, username)
FROM '/Users/kenny/Documents/hrsf/search-bar-kenny/users_data.csv'
DELIMITER ',' CSV HEADER;

COPY Search_History(id, user_id, search_query)
FROM '/Users/kenny/Documents/hrsf/search-bar-kenny/search_history_data.csv'
DELIMITER ',' CSV HEADER;

COPY Restaurants_Cuisines(id, restaurant_id, cuisine_id)
FROM '/Users/kenny/Documents/hrsf/search-bar-kenny/test_restaurant_cuisine_data.csv'
DELIMITER ',' CSV HEADER;

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE Search_History ADD FOREIGN KEY (user_id) REFERENCES Users (id);
ALTER TABLE Restaurants_Cuisines ADD FOREIGN KEY (restaurant_id) REFERENCES Restaurants (id);
ALTER TABLE Restaurants_Cuisines ADD FOREIGN KEY (cuisine_id) REFERENCES Cuisines (id);


-- ---
-- Index optimization 
-- ---

CREATE INDEX Restaurants_Index
ON Restaurants(name, location);

CREATE INDEX Users_index
ON Users(username);

CREATE INDEX Search_history_Index
ON Search_History (search_query);
