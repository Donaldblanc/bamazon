// need to include the msql package to query the database and connect 
var sql = require('mysql');
var inquier = require('inquirer');

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

var createTable = function () {
    mySQLConnect.query("SELECT * FROM products", function (err, results) {
        //console.log(results);
        console.log("itemid \t || productname \t || departmentname \t || price \t || stock_quantity \n")
        for (var i = 0; i < results.length; i++) {
            console.log(
                results[i].itemid + "\t || " + results[i].productname + "\t || " + results[i].departmentname + "\t || " + results[i].price + "\t || " + results[i].stock_quantity + "\n"
            );
        }//for
        customerChoice(results);
    });
}//create table


var customerChoice = function (results) {
    inquier.prompt([{
        type: "input",
        name: "choice",
        message: "what item would you like to purchase?"
    }]).then(function (answer) {
        console.log("user answered :" + answer.choice);
        console.log("results.length;"+results.length);
       
        var exist = false;

        for (var i = 0; i < results.length; i++) {
            //console.log("item: "+ results[i].productname);
            if (results[i].productname == answer.choice) {
                exist = true;
                var item = answer.choice;
                var key = i;
                console.log("We found your item");  
            }
       }//for

    })

}//customerChoice
