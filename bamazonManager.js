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
        askManager(results);
    });
}//create table

var askManager = function (results) {
    inquier.prompt([{
        type: "rawlist",
        name: "choice",
        message: "what do you want to do?",
        choices: ["Add new item", "Add quantity to an existing item"]
    }]).then(function (response) {
        if (response.choice == "Add quantity to an existing item") {
            addQuantity(results);
        }
        if (response.choice == "Add new item") {
            addItem();
        }

    })
}

function addItem(){
    inquier.prompt([{
        type: "input",
        name: "productname",
        message: "what is the name of the product?"
    },{
        type: "input",
        name: "departmentname",
        message: "what department does it go in?"
    },{
        type: "input",
        name: "price",
        message: "how much does it cost" 
    },{
        type: "input",
        name: "quantity",
        message: "how many are available?"
    }]).then(function(response){
        mySQLConnect.query(" INSERT INTO products SET ?", 
        
        { 
            productName :response.productname , 
            departmentname : response.departmentname, 
            Price : response.price, 
            Stock_Quantity: response.quantity
        },
        function (err, results){
            if(err)throw err;
            console.log(response.productname +"ADDED TO BAMAZON");
            createTable();
        })
    })
}





createTable();