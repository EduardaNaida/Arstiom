var page = 1;
var currentDrinksMenu = 'beer';
var menuHeaders = {
    beer: "Beer menu",
    wine: "Wine menu",
    spirits: "Spirits menu",
};

$(document).ready(function(){
    $('#beer_logo').click(function(){
        currentDrinksMenu = 'beer';
        page = 1;
        loadMenu(page, currentDrinksMenu);
    });
    $('#wine_logo').click(function(){
        currentDrinksMenu = 'wine';
        page = 1;
        loadMenu(page, currentDrinksMenu);
    });
    $('#spirits_logo').click(function(){
        currentDrinksMenu = 'spirits';
        page = 1;
        loadMenu(page, currentDrinksMenu);
    });
    $('#next_page').click(nextPage);
    $('#prev_page').click(previousPage);
});

function nextPage(){
   var drinksLength = drinkDB[currentDrinksMenu].length;
   var lastIndex = page * 4;
   var remainder = drinksLength - lastIndex;
    if(remainder > 0){
        page++;
        loadMenu(page, currentDrinksMenu);
    }  
}

function previousPage(){
  var drinksLength = drinkDB[currentDrinksMenu].length;
  if (page > 1){
    page--;
    loadMenu(page, currentDrinksMenu);
  }
}

function loadMenu(page, sortOfDrink){
    var cardsOfDrinks = [];
    var drinks = drinkDB[sortOfDrink];
    var drinksLength = drinks.length;
    var lastIndex = page *4;
    if (lastIndex > drinksLength){
        lastIndex = drinksLength;
    }
    var startIndex = 1;
    if(page > 1){
        startIndex = startIndex + (page - 1) * 4;
    }
    for(i = startIndex - 1; i < lastIndex; i++){
        var imgLink = `../img/drinks/${sortOfDrink}/${drinks[i].id}.jpeg`;
        cardsOfDrinks.push(`<div id = "content_mid_wrapper_${i+1}" onmouseover="hover(this)" class = "content_mid_wrapper" draggable="true" ondragstart=drag(event)>
        <span id = "hover_mid_${i+1}" class = "hover_mid"></span>
        <h1 id = "content_mid_title_${i+1}" class = "content_mid_titles">${drinks[i].name}</h1>
        <div id = "content_mid_${i+1}_container"  class = "content_mid_container"><img class="img-drink" src=${imgLink}></div>
        <p id = "content_mid_${i+1}_text">Price: ${drinks[i].price}kr</p>
        <button id = "content_mid_1_button" class = "content_mid_button">Buy</button>
        </div>`); 
    }


    var drinksMenu = `
        <div id = "content_mid_info">
        <h1 id = "content_mid_info_title">${menuHeaders[currentDrinksMenu]}</h1>
        </div> 
        ${cardsOfDrinks.join('')}`;

    $('#page_nr').text('Page number: ' + page);
    $('#content_mid').html(drinksMenu);

}
