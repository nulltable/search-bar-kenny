USE search;

DROP TABLE IF EXISTS search.search;

CREATE TABLE search (
  id int PRIMARY KEY,
  name text,
  city text,
  cuisine1 text,
  cuisine2 text,
  username text,
  search_query text
);

COPY search(id, name, city, cuisine1, cuisine2, username, search_query)
FROM '/Users/kenny/Documents/hrsf/search-bar-kenny/cassandra_data.csv'
WITH header = true and DELIMITER = ',';