var sql = require('mysql');
var inquier = require('inquirer');
require('console.table');

var mySQLConnect = sql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root",
    database: "bamazon"
});

mySQLConnect.connect(function (err) {
    if (err) throw err;

    createTable();

});

var createTable = function (){
    var sqlQuery = "SELECT * FROM departments" 
    mySQLConnect.query(sqlQuery, function(err,response){
        console.table(response);
        askSup();
    });

}//createTable 

function askSup (){

    inquier.prompt([{
        type: "rawlist",
        name: "choice",
        message: "what do you want to do?",
        choices: ["View Product Sales by Department", "Create New Department"]
    }]).then(function (response) {
        if (response.choice == "Create New Department") {
            addDepartment();
        }
        if (response.choice == "View Product Sales by Department") {
            viewByDept();
        }
    })

}




var viewByDept = function(){
    var sqlQuery =  " Select departProd.departmentid, departProd.departmentname, departProd.overheadcosts, sum(departProd.productsales) as product_sales,  (sum(departProd.productsales) - departProd.overheadcosts ) AS total_profit FROM ( SELECT departments.departmentid, departments.departmentname , departments.overheadcosts, IFNULL(products.productsales, 0) as productsales FROM products RIGHT JOIN departments ON products.departmentname = departments.departmentname) AS departProd GROUP BY departmentid;"
                   
    //" Select departments.departmentid, departments.departmentname, departments.overheadcosts, sum(departments.productsales) as product_sales,  (sum(departments.productsales) - departments.overheadcosts ) AS total_profit FROM ( SELECT departments.departmentid, departments.departmentname , departments.overheadcosts, IFNULL(products.productsales, 0) as productsales FROM products RIGHT JOIN departments ON products.departmentname = departments.departmentname) AS departments GROUP BY departmentid;"
    
    // "SELECT departProd.department_id, departProd.department_name, departProd.over_head_costs, SUM(departProd.product_sales) as product_sales, (SUM(departProd.product_sales) - departProd.over_head_costs) as total_profit FROM (SELECT departments.department_id, departments.department_name, departments.over_head_costs, IFNULL(products.product_sales, 0) as product_sales FROM products RIGHT JOIN departments ON products.department_name = departments.department_name) as departProd GROUP BY department_id"

    mySQLConnect.query(sqlQuery, function(err,response){
        console.log("Error is: " + err);
        console.table(response);
        askSup();
    });
    

}

var addDepartment = function(){
    inquier.prompt([{
        type:"input",
        name: "name",
        message: "What is the name of the department?"
    },{
        type:"input",
        name:"overhead",
        message: "What is the overhead cose of the department?"
    }]).then(function (response){
       // console.log("overhead " + response.overhead );
        mySQLConnect.query(
           
            "INSERT INTO departments SET ?",
            {
                departmentname: response.name,
                overheadcosts: response.overhead,
            },
            function (err, results){
                console.log("ADDED DEPARTMENT");
               // console.log(err)
                createTable();
            }
        );

    });

}