

// Helper functions borrowed from LISP
var cons  =  (a, b) => [a, b];
var car   =  c  => c[0];
var cdr   =  c  => c[1];


// Create a open tag
function open(name, attr, extra){
    var c = ((car(attr) != '') ? "class='" + car(attr)  + "'" : "");
    var i = ((cdr(attr) != '') ? "id='"    + cdr(attr)  + "'" : "");

    return "<" + name + " " + c + " " + i + " " + extra + ">";   
}
// Create a closing tag
var close = name => "</" + name + ">";

// Create a whole HTML element 
var element = (name, attr, extra) => innerHtml =>
    open(name, attr, extra) + innerHtml + close(name);


function htmlList(parentAttr, childAttr, childTag, parentTag, list){    

    // create a element for each child
    var setChildId = (name, attr) =>
	cons(car(attr), IdFun(car(attr))(name));

	
    var childElem = (e) =>
	element(childTag, setChildId(car(e), childAttr), "")(cdr(e)); 
    
    // Create all child elements
    var children = list.map(e => "\n" + childElem(e));
    // Create the parent element
    var parent = element(parentTag, parentAttr, parExtra)(children.join("\n"));

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
var parExtra = "draggable='true' ondragstart=drag(event)"

function genList(obj, name){
    // Generate a structure with element listTag (class parName) containing
    // elemTag with the subitems (json).
    
    var parentClass = IdFun(parName)();

    var chdAttr  = cons(IdFun("elem")(name), "");
    var parAttr  = cons(parentClass, IdFun("list")(name));
			  
    var prop = makeProperties(obj);
        
    return htmlList(parAttr, chdAttr, elemTag, listTag, prop);
}


// genDrink(type, name)
//
// Generate a list containing all the data associated with type and name
// in the drink DB (other DBs should work aswell), with specific ids for
// all the drink data subtypes (price, store etc.)
//
// < $listTag$ class="$parName$" id="list-$type$">
//   < $elemTag$ class="elem-$type$-$subtype key$"> $subtype value$ </$elemTag>
//   ...
// </ $listTag$>
// 
// Ex: genDrink("Carlsberg", "beer")
// => $type$ := beer
//    $subtype$ := beer.carlsberg

function genDrink(type, name){
    
    var obj = getDrinkData(type, name);
    return genList(obj, "beer");
}
