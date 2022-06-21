var currentMenu;
var index;

$(document).ready(function () {
    $("#logout").hide();
    $("#title").text(header['title']);
    $("#login").text(header['login']);
    $("#about").text(header['about']);
    $("#switch").text(header['switch']);
    $("#tables").text(header['tables']);
    $("#headertitle").text(header['headertitle']);
    $("#pageinfo").text(header['pageinfo']);
    $("#home_button").text(header['home_button']);
    $("#login_button").text(header['login_button']);
    $("#menu_button").text(header['menu_button']);
    $("#products_button").text(header['products_button']);
    $("#orders_button").text(header['orders_button']);
    $("#not_buttons").text(header['not_button']);
    $("#content_header").text(content['content_header']);
    eng_beer_menu();
    
});

function eng_beer_menu() {
    var headers = document.getElementsByClassName("content_mid_titles");
    var buttons = document.getElementsByClassName("content_mid_button");
    var price = document.getElementById("content_mid").querySelectorAll("p");
    for (i = 0; i < headers.length; i++)
    {
    $(headers[i]).text(drinkDB.beer[i].name);
    $(buttons[i]).text(beerMenu.button);
    $(price[i]).text("Price: " + drinkDB.beer[i].price);

    currentMenu = "eng_beer";
}}

function getDrinkInfo(type) {
    for (i = 0; i < drinkDB.length; i++)
    {

    }
}
