var index = 0;
var arr = [];
var counts = [];
var amount_cart;
var current_price = 0;
var menu_open;

var undo_stack = [];
var undo_stack_ptr = -1;

function allowDrop(ev) {
    ev.preventDefault();
  }

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }

function drop(ev) {
    var index = 0;
    ev.preventDefault();

    var data = ev.dataTransfer.getData("text");
    var nodeCopy = document.getElementById(data).querySelector(".content_mid_titles").cloneNode(true);

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
}


var applyDB = (category, name, key) => value =>
    getDrinkData(name, category)[key] = value;

var newDBAction = (name, category, key) => key => _ =>
    applyDB(category, name, key)(key);





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
    var oldPrice = current_price;

    // Calculate the new total price
    var newPrice = current_price + parseFloat(getDrinkPrice(name, category));

    // Get old drink stock
    var oldStock = parseFloat(getDrinkStock(name, category));    

    // Calculate the new stock;
    var newStock = oldStock - 1;

    // Function which sets the stock and price back to the (next) value
    function newAction(){	
	current_price = newPrice;
	
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
    document.getElementById("content_right_info_text").innerHTML =
	"price: " + current_price;
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
    current_price = 0;
    document.getElementById("content_right_info_text").innerHTML = ("Price: " + current_price);
    $('.cart_items').remove();
}
