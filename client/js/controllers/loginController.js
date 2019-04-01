function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if (username == "Admin" && password == "password") {
        window.location = "admin.html"; // Redirecting to other page.
        return false;
    }
    else {
    }
}