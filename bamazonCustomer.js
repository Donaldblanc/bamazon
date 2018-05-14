// need to include the msql package to query the database and connect 
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

var createTable = function () {
    mySQLConnect.query("SELECT * FROM products", function (err, results) {
        //console.log(results);
        console.table(results);
        // console.log("itemid \t || productname \t || departmentname \t || price \t || stock_quantity \n")
        // for (var i = 0; i < results.length; i++) {
        //     console.log(
        //         results[i].itemid + "\t || " + results[i].productname + "\t || " + results[i].departmentname + "\t || " + results[i].price + "\t || " + results[i].stock_quantity + "\n"
        //     );
        // }//for
        customerChoice(results);
    });
}//create table

// need to add a function for qutiing 
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

                inquier.prompt({
                    type:"input",
                    name:'quant',
                    message: "how many would you like to purchase?",
                    validate: function(value){
                        if(isNaN(value)==false){
                            return true;
                        }else {
                            return false; 
                        }
                    }
                }).then( function(answer){
                    if( (results[key].stock_quantity - answer.quant) > 0){
                        console.log(" you want " + answer.quant );
                       // console.log(results[key].stock_quantity-answer.quant)
                        mySQLConnect.query("UPDATE products SET stock_quantity='"+(results[key].stock_quantity-answer.quant)+"' WHERE productname='"+ item
                        +"'", function (err,results2){
                                mySQLConnect.query("UPDATE departments SET productsales=productsales+" + (answer.quant*results[key].price) + ", totalsales = productsales - overheadcosts WHERE departmentname= '" + results[key].departmentname + "';",
                                function (err, results3 ){ 
                                    console.log("SALES ADDED TO DEPARTMENT");
                                });
                                console.log( results[key].productname + " Bought!");
                                createTable();
                        })

                    }else{
                        console.log("Not a valid selection!")
                        customerChoice(results);
                    }
                })
            }
       }//for

    })
}//customerChoice
