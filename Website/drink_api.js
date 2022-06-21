
// ================================================================================
// NORMAL_DRINK_DB API
//
// This API conteins the following functions
// 
// allDrinkNames(drinkCategory) 
// getDrinkStock(drinkName, drinkCategory, store) 
// getDrinkStock(drinkName, drinkCategory) 
// setDrinkAvailability(drinkName, drinkCategory, isAvailable) 
// isDrinkAvailable(drinkName, drinkCategory) 
// setDrinkSize(drinkName, drinkCategory, size) 
// getDrinkSize(drinkName, drinkCategory) 
// setDrinkStrength(drinkName, drinkCategory, str) 
// getDrinkStrength(drinkName, drinkCategory) 
// setDrinkProducer(drinkName, drinkCategory, producer) 
// getDrinkProducer(drinkName, drinkCategory) 
// setDrinkType (drinkName, drinkCategory, type) 
// getDrinkType (drinkName, drinkCategory) 
// getDrinkData (drinkName, drinkCategory) 
// applyDrink(drinkName, drinkCategory, fun)



/***************** GENERAL FUNCTIONS ********************/
// Wrapper for getting the data associated to ´drinkName´
function getDrinkData (drinkName, drinkCategory) {
 
    for (var i = 0; i < drinkDB[drinkCategory].length; i++){
	if (drinkDB[drinkCategory][i]["name"] == drinkName){
	    return drinkDB[drinkCategory][i];
	}
    }
    // If not found returns a empty object
    return {};
}

// Wrapper for getting the Amount in storage of ´drinkName´
function allDrinkNames(drinkCategory) {
    var nameCollect = [];
    
    for (var i = 0; i < drinkDB[drinkCategory].length; i++){
	nameCollect.push(drinkDB[drinkCategory][i]["name"]);
    }
    return nameCollect;
}

// Wrapper for applying a lambda function to the datastructure
// of a drink item
function applyDrink(drinkName, drinkCategory, fun) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    fun(drinkData);
}
// Example of using applyDrink:
// > applyDrink("Staropramen", "beer", x => x["name"] = "test")
//  ==> Undefined
// 
// > getDrinkData("test", "beer");
//  ==> Object { name: "test", ...
//
// > getDrinkData("Staropramen", "beer");
//  ==> Object {}
// 


/******************* DRINK STOCK ********************/

// Wrapper for getting the Amount in storage of ´drinkName´
function getDrinkStock(drinkName, drinkCategory) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    return drinkData["store"];
}

// Wrapper for setting the Amount in storage of ´drinkName´
function setDrinkStock(drinkName, drinkCategory, store) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    drinkData["store"] = store;
}

/******************* DRINK PRICE ********************/

// Wrapper for getting the Price in storage of ´drinkName´
function getDrinkPrice(drinkName, drinkCategory) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    return drinkData["price"];
}

// Wrapper for setting the Price in storage of ´drinkName´
function setDrinkPrice(drinkName, drinkCategory, store) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    drinkData["price"] = store;
}



/***************** DRINK AVAILABILITY ********************/

// Wrapper for setting the Availability associated to ´drinkName´
// as true or false (in stock or not)
function setDrinkAvailability(drinkName, drinkCategory, isAvailable) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    drinkData["available"] =isAvailable.toString();
}
// Wrapper for getting the Availability associated to ´drinkName´
// as true or false (in stock or not)
function isDrinkAvailable(drinkName, drinkCategory) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    if (drinkData["available"] == "true"){
	return true;
    }else return false;    
}



/***************** DRINK SIZE ********************/

// Wrapper for setting the Size associated to ´drinkName´
function setDrinkSize(drinkName, drinkCategory, size) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    drinkData["size"] = size;
}
// Wrapper for getting the Size associated to ´drinkName´
function getDrinkSize(drinkName, drinkCategory) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    return drinkData["size"];
}



/***************** DRINK STRENGTH ********************/
// Wrapper for setting the Strength associated to ´drinkName´
function setDrinkStrength(drinkName, drinkCategory, strength) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    drinkData["strength"] = strength;
}
// Wrapper for getting the Strength associated to ´drinkName´
function getDrinkStrength(drinkName, drinkCategory) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    return drinkData["strength"];
}


/***************** DRINK PRODUCER ********************/
// Wrapper for setting the Producer associated to ´drinkName´
function setDrinkProducer(drinkName, drinkCategory, producer) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    drinkData["prod"] = producer;
}
// Wrapper for getting the Producer associated to ´drinkName´
function getDrinkProducer(drinkName, drinkCategory) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    return drinkData["prod"];
}


/***************** DRINK TYPE ********************/
// Wrapper for setting the Type associated to ´drinkName´
function setDrinkType (drinkName, drinkCategory, type) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    drinkData["type"] = type;
}
// Wrapper for getting the Type associated to ´drinkName´
function getDrinkType (drinkName, drinkCategory) {
    var drinkData = getDrinkData(drinkName, drinkCategory);
    return drinkData["type"];
}

