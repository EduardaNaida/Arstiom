var index = 0;
var arr = [];
var counts = [];
var amount_cart;
var current_price = 0;
var menu_open;

var undo_stack = [];
var undo_stack_ptr = -1;

var prev; 
var actions = [];
var tablesUsed = 0;

var drinks = [];
var redoarr = [];
var empty = []; 
function allowDrop(ev) {
    ev.preventDefault();
  }

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }


function drop(ev) {
        prev = $("#content_right").html();
        actions.push(prev);

    if(empty.length == 0)
    {
        empty.push($("#content_right").html());
    }
    var index = 0;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById(data).querySelector(".content_mid_titles").cloneNode(true);
    drinks.push(nodeCopy.textContent);
    if(!checkAvailability(nodeCopy.textContent)) {
        window.alert("Not enough " + nodeCopy.textContent + " in stock!");
        return;
    }

    for (i = 0; i < arr.length; i++) {
            index++;
        if (nodeCopy.textContent === arr[i])
        {
            counts[i] = counts[i] + 1;
            console.log(counts[i]);
            document.getElementById("cart_"+nodeCopy.textContent).innerHTML =
		    (nodeCopy.textContent + " x" + counts[i]);
            removeFromDb(nodeCopy.textContent);
            setPrice(nodeCopy.textContent);
            return;
        }
    }
    amount_cart++;
    counts[index] = 1;
    nodeCopy.id = ("cart_"+nodeCopy.textContent);
    nodeCopy.className = "cart_items";
    arr.push(nodeCopy.textContent);

    var textNode = document.createTextNode(nodeCopy.textContent);
    nodeCopy.nodeValue = (nodeCopy.textContent + counts[index]);
    setPrice(nodeCopy.textContent);
    removeFromDb(nodeCopy.textContent);
    ev.target.appendChild(nodeCopy);
    for(i = 0; i < redoarr.length; i++)
    {
        console.log(redoarr[i]);
    }

}

var applyDB = (category, name, key) => value =>
    getDrinkData(name, category)[key] = value;

var newDBAction = (name, category, key) => key => _ =>
    applyDB(category, name, key)(key);



function tjarkWeber() {
    var aids = drinks.pop();
    undoAddCart("beer",aids);
}

function undoTjark() {
    if (redoarr.length != 0)
    {
        var aids = redoarr.pop();
        console.log("Pushed following to actions:" + aids);
        actions.push(aids);
        var asses = document.getElementById("content_right");
        asses.innerHTML = aids ? aids : asses.innerHTML;
        console.log("ass");
        var oldPrice = current_price;
        console.log(current_price);
        var names = drinks.pop();
        // Calculate the new total price
        var newPrice = current_price + parseFloat(getDrinkPrice(names, "beer"));

        // Get old drink stock
        var oldStock = parseFloat(getDrinkStock(names, "beer"));    

        // Calculate the new stock;
        var newStock = oldStock - 1;

        // Function which sets the stock and price back to the (next) value
        function newAction(){
        if(!isNaN(newPrice))
        {

            current_price = newPrice;
        }
        setDrinkStock(names, "beer", newStock);
        updatePrice(); 
        }
        }
}

function newUndoDBAction(name, category, key){
    var oldValue = parseFloat(getDrinkData(name, category)[key]);
    return value =>
    [f => getDrinkData(name, category)[key] = value,
     f => getDrinkData(name, category)[key] = oldValue];
}

function testUndo(){
    action(newUndoDBAction("Carlsberg", "beer", "price")(100))
    action(newUndoDBAction("Carlsberg", "beer", "price")(200))
    action(newUndoDBAction("Carlsberg", "beer", "price")(300))
    action(newUndoDBAction("Carlsberg", "beer", "price")(400))    
}

function redo(){
    // Run the redo function in the undo stack and increment
    // the undo stack ptr to point to the previous undo value

    undo_stack[undo_stack_ptr][0]();

    if (undo_stack_ptr + 1 < undo_stack.length)
	undo_stack_ptr++;
}


function undoAddCart(category, name){
    // Get the current price

    
    arr.pop();
    if (actions.length == 0)
    {
        document.getElementById("content_right").innerHTML = empty.pop();
        
    }
    var ass = actions.pop();
    redoarr.push(document.getElementById("content_right").innerHTML);
    console.log(ass);
    
    var asses = document.getElementById("content_right");
    asses.innerHTML = ass ? ass : asses.innerHTML;
    var oldPrice = current_price;
    console.log(current_price);
    // Calculate the new total price
    var newPrice = current_price - parseFloat(getDrinkPrice(name, category));

    // Get old drink stock
    var oldStock = parseFloat(getDrinkStock(name, category));    

    // Calculate the new stock;
    var newStock = oldStock - 1;

    // Function which sets the stock and price back to the (next) value
    function newAction(){
    if(!isNaN(newPrice))
    {

	    current_price = newPrice;
    }
	setDrinkStock(name, category, newStock);
	updatePrice(); 
    }
    // Function which sets the stock and price back to the (current) value
    function newAntiAction(){
	current_price = oldPrice;

	setDrinkStock(name, category, oldStock);
	updatePrice(); 
    }
    action([newAction, newAntiAction]);
}

function updatePrice(){
    if (current_price <= 0)
    {

        current_price = 0;
    }
    document.getElementById("content_right_info_text").innerHTML =
	"Price: " + current_price;
}
function undo(){
    // Run the undo function in the undo stack and decrement
    // the undo stack ptr to point to the previous undo value

    undo_stack[undo_stack_ptr][1]();

    if (undo_stack_ptr > 1) undo_stack_ptr--;
}

function action(action){
    // Add action and inverse action to  undo stack

    action[0](); // Run action
    console.log("Ran action");
    // Add action to undo stack
    undo_stack.push(action);
    console.log("Pushed action");
    undo_stack_ptr = undo_stack.length - 1;
    console.log("Inc stack ptr");
}

function removeFromDb(drink){
    // Updated to use drink API
    var storage = parseFloat(getDrinkStock(drink, "beer"));
    setDrinkStock(drink, "beer", storage - 1);
}


function checkAvailability(drinkName) {
    
    return  parseFloat(getDrinkStock(drinkName, "beer")) > 0;

}

function setPrice(drink) {
    // Updated to use drink API
    current_price =
	parseFloat(current_price) +
	parseFloat((getDrinkPrice(drink, "beer")));
    
    document.getElementById("content_right_info_text").innerHTML =
	("Price: " + current_price);
}

function contentRightClick() {
    console.log(currentWindow);
    switch(currentWindow) {
    case "menu" :
        checkout();
        break;
}
}

function checkout () {
    counts = [];
    arr = [];
    var cart = document.getElementsByClassName("cart_items");
    if(tablesUsed == 4)
    {
        window.alert("Too few tables!");
        return;
    }
    tablesUsed++;
    for(i = 0; i < cart.length; i++)
    {
    console.log(cart.textContent);
    }
    var array = [];
    for (i = 0; i < cart.length; i++)
    {  
        array[i] = cart[i].textContent;
        console.log(array[i]);
    }
    orderDB.Tables.push({'Number': tablesUsed, 'Orders' : array, 'Price' : current_price});
        console.log(orderDB.Tables);

        current_price = 0;
        document.getElementById("content_right_info_text").innerHTML = ("Price: " + current_price);
    $('.cart_items').remove();
}