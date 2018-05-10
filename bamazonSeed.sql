INSERT INTO products( productName, departmentName, Price, StockQuantity)
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

       
       

      UPDATE  products
      set productName = "Jordan Retro 1"
       where itemid = 10
