INSERT INTO departments (departmentname, overheadcosts, productsales, totalsales)
VALUES ("Clothing", 1800,0,0),
        ("Food", 2100,0,0),
        ("Personal care", 300, 0, 0),
        ("Electronics", 52000,0,0),
        ("Toys", 37000,0,0);


select * from departments

 drop TABLE departments;
 
 create table departments (
    departmentid INT auto_increment not null ,
    departmentname VARCHAR(50) not null,
    overheadcosts INT not null,
    primary key (departmentid)
);

INSERT INTO departments (departmentname, overheadcosts)
VALUES ("Clothing", 1800),
        ("Food", 2100),
        ("Personal care", 300),
        ("Electronics", 52000),
        ("Toys", 37000);






use bamazon;
drop table products;

create table products(
	itemid integer auto_increment not null,
	productname varchar(45) not null,
	departmentname varchar(45) not null,
	price decimal (10,4) not NULL, 
	stock_quantity integer not null,
	productsales INT,
	primary key (itemid)	
);


select * from products 


INSERT INTO products( productName, departmentName, Price, stock_quantity)
VALUES ("Polo Shirt", "Clothing", 89.95, 110),
       ("5 hour energy", "Food","19.98",48),
       ("Clif Energy Bar", "Food","5.87",6),
       ("Dove Skin Beauty Bar", "Personal care","10.87",350),
       ("Philips 55in 4K Smart TV", "Electronics", 378.00, 210),
       ("Axe Phoenix Personal Care Regimen", "Personal care","5.87",6),
       ("WIRELESS ACCESS POINT - AIR-AP1852I", "Electronics","585.15",350),
       ("Cisco 38050 switch", "Electronics","15845.69",36),
       ("Cisco 2960x switch", "Electronics","12045.89",57),
       ("Jordan Retro 1", "Clothing", 175.99, 65);

       Select * FROM bamazon.products;
       
       
       
       
      "SELECT departProd.department_id, departProd.department_name, departProd.over_head_costs, SUM(departProd.product_sales) as product_sales, (SUM(departProd.product_sales) - departProd.over_head_costs) as total_profit FROM (SELECT departments.department_id, departments.department_name, departments.over_head_costs, IFNULL(products.product_sales, 0) as product_sales FROM products RIGHT JOIN departments ON products.department_name = departments.department_name) as departProd GROUP BY department_id" 
       
       
     Select departments.departmentid, departments.departmentname, departments.overheadcosts, sum(departments.productsales) as product_sales,  (sum(departments.productsales) - departments.overheadcosts ) AS total_profit FROM ( SELECT departments.departmentid, departments.departmentname , departments.overheadcosts, IFNULL(products.productsales, 0) as productsales FROM products RIGHT JOIN departments ON products.departmentname = departments.departmentname) AS departments GROUP BY departmentid;
       
       
       

