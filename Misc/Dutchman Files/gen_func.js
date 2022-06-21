

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

// Usage:
// > var obj = getDrinkData("Norrlands", "beer");
// > genList(obj, "side", "beer")
// ==> <div class=... </div>

x


// Helper functions borrowed from LISP
var cons  =  (a, b) => [a, b];
var car   =  c  => c[0];
var cdr   =  c  => c[1];


// Create a open tag
function open(name, attr){
    var c = ((car(attr) != '') ? "class='" + car(attr)  + "'" : "");
    var i = ((cdr(attr) != '') ? "id='"    + cdr(attr)  + "'" : "");

    return "<" + name + " " + c + " " + i + ">";   
}
// Create a closing tag
var close = name => "</" + name + ">";

// Create a whole HTML element 
var element = (name, attr) => innerHtml =>
    open(name, attr) + innerHtml + close(name);


function htmlList(parentAttr, childAttr, childTag, parentTag, list){    

    // create a element for each child
    var childElem = (e) =>
	element(childTag, childAttr)(car(e)) + "\n" + 
	element(childTag, childAttr)(cdr(e)); 

    // Create all child elements
    var children = list.map(e => "\n" + childElem(e));
    // Create the parent element
    var parent = element(parentTag, parentAttr)(children.join("\n"));

    return parent;	
}

// Function for setting the id or class of a element
// Use: IdFun(type)(subtype)
// Ex:  IdFun("list")("element")
var IdFun = type => subType =>
    type + ((subType ) ? "-" + subType : "");

// Extract all keys and values as cons(key, value)
var makeProperties = obj =>
    (Object.keys(obj)).map(v => cons(v, obj[v]));

var parName = "gen-list";
var elemTag = "span";
var listTag = "div";

function genList(obj, name){
    var parentClass = IdFun(parName)();

    var chdAttr  = cons("",          IdFun("elem")(name));
    var parAttr  = cons(parentClass, IdFun("list")(name));
			  
    var prop = makeProperties(obj);
        
    return htmlList(parAttr, chdAttr, elemTag, listTag, prop);
}


// === element ===
// Use: element(tag, attr)(innerHtml)
// 
// attr := cons(`id`, `class`)  - Id and Class as strings in a Cons
// tag  := `tag`                - HTML tag as a string
// innerHtml                    - Inner Html

// Ex: element("div", cons("side-text", "left"))("<p>Left side text</p>")
// ==> <div class="side-text" id="left" >
//       <p>Left side text</p>
//     </div>
// 


