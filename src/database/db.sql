-- Creating the database
CREATE DATABASE dbff;

-- Using the database
use dbff;
-- Creating a table
CREATE TABLE users(
	id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	rol CHAR(1)
);
-- tp show all tables 
SHOW TABLES;

-- To describe the table
describe users