function validateForm() {
    let form = document.querySelector(".form-control");
    let path = form.getAttribute("data-path");
    let email = document.getElementById("email");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let confirmPassword = document.getElementById("con-password");

    // Reset error messages
    document.getElementById("email-error").innerText = "";
    document.getElementById("username-error").innerText = "";
    document.getElementById("password-error").innerText = "";
    if (confirmPassword) document.getElementById("confirm-password-error").innerText = "";

    let isValid = true;

    if (path === '/register') {
        if (!validateEmail(email.value)) {
            document.getElementById("email-error").innerText = "Please enter a valid email address.";
            isValid = false;
        }
        
        if (username.value.length < 3) {
            document.getElementById("username-error").innerText = "Username must be at least 3 characters long.";
            isValid = false;
        }

        if (password.value.length < 6) {
            document.getElementById("password-error").innerText = "Password must be at least 6 characters long.";
            isValid = false;
        }
        
        if (password.value != confirmPassword.value) {
            document.getElementById("confirm-password-error").innerText = "Passwords do not match.";
            isValid = false;
        }
    } else if (path === '/login') {
        
        if (username.value.trim() === "") {
            document.getElementById("username-error").innerText = "Please enter your username or email.";
            isValid = false;
        }

        if (password.value.trim() === "" || password.value.length <6) {
            document.getElementById("password-error").innerText = "Please enter your password.";
            isValid = false;
        }
    }

    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
