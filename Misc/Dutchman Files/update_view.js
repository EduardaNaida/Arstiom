var currentWindow;

function updateContent(button) {
    console.log(cred);
    switch(button) {
        case 'login':
            loginContainer();
        break;
        case 'menu':
            if(cred == 0)
            {
            menuContainer();
            }

            else if (cred == 1)
            {
                bartenderTables();
            }

            else
            {
                console.log(cock);
            }
            break;
        case 'orders':
        {
            if(cred == 1)
            {

            updateProductManagemenet();
            break;
            }
            break;
        }
    }
}


function loginContainer() {
        currentWindow = "login";
        $("#content_header").text("Login");      
}

function menuContainer() {
    currentWindow = "menu";
    $("#content_header").text("Menu");
    load_container_logos();      
}

function load_container_logos()
{
    document.getElementById("beer_logo").src = "../img/595e5acd70308b1a215b70d0.png";
    document.getElementById("wine_logo").src = "../img/wine.png";
    document.getElementById("spirits_logo").src = "../img/spirits.png";
}


// byt till bättre namn
function loadBartender() {
    console.log("cock");
    $("#menu_button").text("View Tables");
    $("#orders_button").text("Product managemenet");
    $("#products_button").text("");
    bartenderTables();
   
}

function bartenderTables() {
    $(".stocks").hide();
    $(".price").hide();
    //$('.tableOrders').show();
    $("#content_mid_1_text").show();
    $("#content_mid_2_text").show();
    $("#content_mid_3_text").show();
    $("#content_mid_4_text").show();
    $("#content_mid_title_1").text("Table 1");
    $("#content_mid_title_2").text("Table 2");
    $("#content_mid_title_3").text("Table 3");
    $("#content_mid_title_4").text("Table 4");
    $("#content_mid_info_title").text("All tables");
    $("#content_mid_1_text").text("Total: ");
    $("#content_mid_2_text").text("Total: ");
    $("#content_mid_3_text").text("Total: ");
    $("#content_mid_4_text").text("Total: ");
    $(".content_mid_button").text("Clear");

    var tableDivs = document.getElementsByClassName("content_mid_container");
    for (i = 1; i < 5; i++)
    {
        var orders = orderDB.Tables[i].Orders;
        console.log(orderDB.Tables[i].Orders);
        console.log(orders.length);
        $("#content_mid_" + i + "_text").text("Total: " + orderDB.Tables[i].Price);
        for(j = 0; j< orders.length; j++)
        {
            var div = document.createElement("tableContent" + i);
              div.innerHTML += orders[j];
              div.className = "tableOrders";
              tableDivs[i-1].appendChild(div);
        }

        $("tablecontent" + i).css({"float" : "left", "width" :"100%"});
       // tableDivs[i-1].innerHTML = [orderDB.Tables[i].Orders];
    }
}

function updateProductManagemenet() {

    $("#content_mid_title_1").text("Staropramen");
    $("#content_mid_title_2").text("Carlsberg");
    $("#content_mid_title_3").text("Norrlands");
    $("#content_mid_title_4").text("Gränges");
    $("#content_mid_info_title").text("All tables");
    $("#content_mid_info_title").text("Product managemenet");
    $("#content_mid_1_text").hide();
    $("#content_mid_2_text").hide();
    $("#content_mid_3_text").hide();
    $("#content_mid_4_text").hide();
    $(".content_mid_button").text("Remove from menu");
    $('.tableOrders').hide();
    displayStock();
    displayPrice();
}

function displayStock() {
    var tableDivs = document.getElementsByClassName("content_mid_container");
    console.log(drinkDB.beer[0].store);
    for(i = 0; i < drinkDB.beer.length; i ++)
    {
        var stock = document.createElement("stock" + i);
        stock.innerHTML = ("Stock: "+ drinkDB.beer[i].store);
        stock.className = "stocks";
        stock.id = drinkDB.beer[i].name + "stock";
        stock.name = drinkDB.beer[i].name;
        tableDivs[i].appendChild(stock);
        $("stock" + i).on("click", function() {
            var change = prompt("Please enter new stock:");
            console.log(this);
            var newstock = (this).innerHTML = "Stock: " + change; 
            console.log(newstock);
            console.log(this.name);
            console.log([drinkIndex[this.name]]);
            drinkDB.beer[parseFloat(drinkIndex[this.name])-1].store = change;
            console.log(drinkDB.beer[drinkIndex[this.name]].store);
        });
    }
}

function displayPrice() {

    var tableDivs = document.getElementsByClassName("content_mid_container");
    for(i = 0; i < drinkDB.beer.length; i ++)
    {
        var stock = document.createElement("Price" + i);
        stock.innerHTML = ("Price: "+ drinkDB.beer[i].price);
        stock.className = "price";
        stock.id = drinkDB.beer[i].name + "stock";
        stock.name = drinkDB.beer[i].name;
        tableDivs[i].appendChild(stock);
        $("price" + i).on("click", function() {
            var change = prompt("Please enter new Price:");
            console.log(this);
            var newstock = (this).innerHTML = "Price: " + change; 
            console.log(newstock);
            console.log(this.name);
            console.log([drinkIndex[this.name]]);
            drinkDB.beer[parseFloat(drinkIndex[this.name])-1].price = change;
            console.log(drinkDB.beer[drinkIndex[this.name]].price);
        });
    }
    $(".price").css({"float" : "left", "width" :"100%"});
}

