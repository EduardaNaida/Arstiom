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
        $("#content_header").text("Login");      
}

function menuContainer() {
    $("#content_header").text("Menu");      
}