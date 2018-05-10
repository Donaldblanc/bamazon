create database bamazon;

use bamazon;

create table products(
	itemid integer auto_increment not null,
	productname varchar(45) not null,
	departmentname varchar(45) not null,
	price decimal (10,4) not NULL, 
	stock_quantity integer not null,
	primary key (itemid)
	
);
