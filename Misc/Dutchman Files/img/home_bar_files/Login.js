function loginClicked(user, pass) {
    var usernames = allUserNames();
    if (usernames.includes(user)) {
        for(i = 0; i < DB.users.length; i++) {
            if ((user === usernames[i] && (pass === DB.users[i].password))) {
                window.location.href="loggedin.html";
                return;
            } 
        }
    } else {
        document.getElementById("trueorfalse").innerHTML = "User doesn't exist";
        return;
    }
    document.getElementById("trueorfalse").innerHTML = "Failed login";
    return;
}

function guestLoginClicked() {
    window.location.href="guest.html";
}

function logout() {
    window.location.href="login.html";
}