// Check if password and confirm password match
const password = document.getElementById("user_password");
const confirmPassword = document.getElementById("confirm_password");
const form = document.querySelector("form");
const email = document.getElementById("mail");
const countrySelect = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");

function showFieldError(field, message) {
    field.style.boxShadow = "0 0 8px 2px red";
    field.style.borderColor = "red";
    alert(message);
}

function clearFieldError(field) {
    field.style.boxShadow = "";
    field.style.borderColor = "";
}

// Live validation - clear errors as user types
[email, postalCodeField, password, confirmPassword].forEach(field => {
    field.addEventListener("input", () => clearFieldError(field));
});

// Live password match check
confirmPassword.addEventListener("input", () => {
    if (confirmPassword.value === "") return;
    if (password.value !== confirmPassword.value) {
        confirmPassword.style.boxShadow = "0 0 8px 2px red";
        confirmPassword.style.borderColor = "red";
    } else {
        confirmPassword.style.boxShadow = "0 0 8px 2px green";
        confirmPassword.style.borderColor = "green";
    }
});

// Postal code validation
function checkPostalCode() {
    const constraints = {
        ch: ["^(CH-)?\\d{4}$", "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950"],
        fr: ["^(F-)?\\d{5}$", "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012"],
        de: ["^(D-)?\\d{5}$", "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345"],
        nl: ["^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$", "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS"],
    };
    const country = countrySelect.value;
    const constraint = new RegExp(constraints[country][0], "");
    if (constraint.test(postalCodeField.value)) {
        postalCodeField.setCustomValidity("");
    } else {
        postalCodeField.setCustomValidity(constraints[country][1]);
    }
}

countrySelect.addEventListener("change", checkPostalCode);
postalCodeField.addEventListener("input", checkPostalCode);

// Single submit listener
form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset all fields
    [email, postalCodeField, countrySelect, password, confirmPassword].forEach(field => {
        clearFieldError(field);
    });

    let isValid = true;

    if (email.value === "") {
        showFieldError(email, "Email is required!");
        isValid = false;
    } else if (!email.validity.valid) {
        showFieldError(email, "Please enter a valid email address!");
        isValid = false;
    }

    if (postalCodeField.value === "") {
        showFieldError(postalCodeField, "Postal code is required!");
        isValid = false;
    } else if (postalCodeField.validity.customError) {
        showFieldError(postalCodeField, postalCodeField.validationMessage);
        isValid = false;
    }

    if (password.value === "") {
        showFieldError(password, "Password is required!");
        isValid = false;
    }

    if (confirmPassword.value === "") {
        showFieldError(confirmPassword, "Please confirm your password!");
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showFieldError(confirmPassword, "Passwords do not match!");
        isValid = false;
    }

    if (isValid) {
        form.style.display = "none";
        document.getElementById("success-message").style.display = "block";
    }
});