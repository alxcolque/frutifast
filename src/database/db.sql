
-- Creating the database
CREATE DATABASE dbff;

-- Using the database
use dbff;
-- Creating a table
CREATE TABLE users(
	user_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	user_name VARCHAR(50) NOT NULL,
	password VARCHAR(50) NOT NULL,
	rol CHAR(1),
	pic VARCHAR(100),
);

CREATE TABLE warehouses(
	warehouse_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	addess VARCHAR(80) NOT NULL
);

CREATE TABLE types(
	type_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);
CREATE TABLE items(
	item_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	type_id INT(11) UNSIGNED NOT NULL,
	name VARCHAR(50) NOT NULL,
	price DOUBLE(8,2) NOT NULL,
	CONSTRAINT ´fk_type´
	FOREIGN KEY(type_id) REFERENCES types(type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE sales(
	sale_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT(11) UNSIGNED NOT NULL,
	warehouse_id INT(11) UNSIGNED NOT NULL,
	total VARCHAR(50) NOT NULL,
	fecha DATETIME NOT NULL,
	CONSTRAINT ´fk_user_sales´
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT ´fk_warehouse_sales´
	FOREIGN KEY(warehouse_id) REFERENCES warehouses(warehouse_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE purchases(
	purchase_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT(11) UNSIGNED NOT NULL,
	item_id INT(11) UNSIGNED NOT NULL,
	quantity INT(6) NOT NULL,
	total VARCHAR(50) NOT NULL,
	fecha DATETIME NOT NULL,
	CONSTRAINT ´fk_user_purchases´
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT ´fk_items_puchases´
	FOREIGN KEY(item_id) REFERENCES items(item_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE orders(
	order_id INT(11) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user_id INT(11) UNSIGNED NOT NULL,
	item_id INT(11) UNSIGNED NOT NULL,
	addess VARCHAR(80) NOT NULL,
	quantity INT NOT NULL,
	state CHAR(1) NOT NULL,
	date_sent DATETIME NOT NULL,
	date_delivered DATETIME NOT NULL,
	CONSTRAINT ´fk_user_orders´
	FOREIGN KEY(user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT ´fk_items_orders´
	FOREIGN KEY(item_id) REFERENCES items(item_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE stocks(
	warehouse_id INT(11) UNSIGNED NOT NULL,
	item_id INT(11) UNSIGNED NOT NULL,
	quantity INT(6) NOT NULL,
	PRIMARY KEY(warehouse_id,item_id),
	CONSTRAINT ´fk_warehouse_stocks´
	FOREIGN KEY(warehouse_id) REFERENCES warehouses(warehouse_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT ´fk_items_sotocks´
	FOREIGN KEY(item_id) REFERENCES items(item_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE sales_detail(
	sale_id INT(11) UNSIGNED NOT NULL,
	item_id INT(11) UNSIGNED NOT NULL,
	quantity INT(6) NOT NULL,
	PRIMARY KEY(sale_id,item_id),
	CONSTRAINT ´fk_sales_sales_detail´
	FOREIGN KEY(sale_id) REFERENCES sales(sale_id) ON DELETE CASCADE ON UPDATE CASCADE,
	CONSTRAINT ´fk_items_sales_detail´
	FOREIGN KEY(item_id) REFERENCES items(item_id) ON DELETE CASCADE ON UPDATE CASCADE
);


-- tp show all tables 
SHOW TABLES;

-- To describe the table
describe users