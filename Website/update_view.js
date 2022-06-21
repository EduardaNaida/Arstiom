var currentWindow;

function updateContent(button) {
    switch(button) {
        case 'login':
            loginContainer();
        break;
        
        case 'menu':
            menuContainer();
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

function loadBearMenu() {
    
}