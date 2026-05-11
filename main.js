// Check if password and confirm password match
const password = document.getElementById("user_password");
const confirmPassword = document.getElementById("confirm_password");
const form = document.getElementById("signup-form");

confirmPassword.addEventListener("input", () => {
    if (password.value !== confirmPassword.value) {
        confirmPassword.style.boxShadow = "0 0 8px 2px red";
        confirmPassword.style.borderColor = "red";
    } else {
        confirmPassword.style.boxShadow = "0 0 8px 2px green";
        confirmPassword.style.borderColor = "green";
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return; // Stops here - doesn't send anything
    }
    alert("Account created successfully!"); // Paswords match - valid form
});