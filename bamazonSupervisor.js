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
    var sqlQuery = " Select departments.departmentid, departments.departmentname, departments.overheadcosts,  sum(departments.productsales) as total_sales,  (  sum(departments.productsales) - departments.overheadcosts ) total_profit from products left join departments on products.departmentname = departments.departmentid group by products.departmentname"
    mySQLConnect.query(sqlQuery, function(err,response){
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
                productsales : 0,
                totalsales: 0
            },
            function (err, results){
                console.log("ADDED DEPARTMENT");
               // console.log(err)
                createTable();
            }
        );

    });

}