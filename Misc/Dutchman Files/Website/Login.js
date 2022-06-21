
var login_div_css;
var login_div_html;
var currentlyloggedin;
var cred;

function loginClicked(user, pass) {
    var usernames = allUserNames();
    if (usernames.includes(user)) {
        for(i = 0; i < DB.users.length; i++) {
            if ((user === usernames[i] && (pass === DB.users[i].password))) {
                window.alert("Login Successful! Logged in as " + user);
                login_div_html = document.getElementById('loginstatus').innerHTML;
                login_div_css = document.getElementById('loginstatus').style;
                cred = DB.users[i].credentials;
                currentlyloggedin = user;
                loginSuccessful(user);
                return;
            }
            
            if ((user === usernames[i] && !(pass === DB.users[i].password))) {
                window.alert("Wrong password for " + user + "!");
                return;
            } 
        }
    } else {
        window.alert("User " + user + " doesnt exist!");
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
    $('#loginstatus').html(login_div_html);
    $('#loginstatus').css({"color": "white", "position": "relative", "bottom": "135px", "float": "right",
    "padding-right": "20px", "padding-bottom": "80px"});
    $('#logout').hide();
    window.alert("Successfully logged out " + currentlyloggedin);
    currentlyloggedin = "";
    cred = "";
}

function loginSuccessful(user) {
    $("#loginstatus").text("Logged in as " + user);
    $("#loginstatus").css('padding-right', '100px');
    $("#logout").show();
}