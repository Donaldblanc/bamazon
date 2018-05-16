 drop TABLE departments;
 create table departments (
    departmentid INT auto_increment not null ,
    departmentname VARCHAR(50) not null,
    overheadcosts INT not null,
    productsales INT not null,
    totalsales INT not null,
    primary key (departmentid)
);
