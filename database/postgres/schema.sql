-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Restaurants'
-- 
-- ---

DROP TABLE IF EXISTS `Restaurants`;
		
CREATE TABLE `Restaurants` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(255) NOT NULL AUTO_INCREMENT DEFAULT 'NOT NULL',
  `cuisine_id` INTEGER NOT NULL DEFAULT NOT NULL,
  `location id` INTEGER NOT NULL DEFAULT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Locations'
-- 
-- ---

DROP TABLE IF EXISTS `Locations`;
		
CREATE TABLE `Locations` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `city` VARCHAR(25) NOT NULL DEFAULT 'NOT NULL',
  `county` VARCHAR(20) NOT NULL DEFAULT 'NOT NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Cuisines'
-- 
-- ---

DROP TABLE IF EXISTS `Cuisines`;
		
CREATE TABLE `Cuisines` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `cuisine` VARCHAR(20) NOT NULL DEFAULT 'NOT NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'Users'
-- 
-- ---

DROP TABLE IF EXISTS `Users`;
		
CREATE TABLE `Users` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `username` VARCHAR(20) NOT NULL DEFAULT 'NOT NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'search history'
-- 
-- ---

DROP TABLE IF EXISTS `search history`;
		
CREATE TABLE `search history` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `user_id` INTEGER(255) NOT NULL DEFAULT NOT NULL,
  `search query` VARCHAR(255) NOT NULL DEFAULT 'NOT NULL',
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `Restaurants` ADD FOREIGN KEY (cuisine_id) REFERENCES `Cuisines` (`id`);
ALTER TABLE `Restaurants` ADD FOREIGN KEY (location id) REFERENCES `Locations` (`id`);
ALTER TABLE `search history` ADD FOREIGN KEY (user_id) REFERENCES `Users` (`id`);
