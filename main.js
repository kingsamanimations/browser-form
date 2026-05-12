// Check if password and confirm password match
const password = document.getElementById("user_password");
const confirmPassword = document.getElementById("confirm_password");
const form = document.getElementById("form");
const email = document.getElementById("mail");
const emailError = document.querySelector("#mail + span.error");
const countrySelect = document.getElementById("country");
const postalCodeField = document.getElementById("postal-code");

confirmPassword.addEventListener("input", () => {
    e.preventDefault();

    // Reset all fields first
    clearFieldError(email);
    clearFieldError(postalCodeField);
    clearFieldError(countrySelect);
    clearFieldError(password);
    clearFieldError(confirmPassword);

    let isValid = true;

    if (email.value === "") {
        showFieldError(email, "Email is required!");
        isValid = false;
    } else if (!email.validity.valid) {
        showFieldError(email, "Please enter a valid email address!");
        isValid = false;
    }

    if (countrySelect.value === "") {
        showFieldError(countrySelect, "Please select a country!");
        isValid = false;
    }

    if (postalCodeField.value === "") {
        showFieldError(postalCodeField, "Postal code is required!");
        isValid = false;
    } else if (!postalCodeField.validity.customError) {
        showFieldError(postalCodeField, postalCodeField.validationMessage);
        isValid = false;
    }

    if (password.value === "") {
        showFieldError(password, "Password is required!");
        isValid = false;
    }

    if (confirmPassword.value == "") {
        showFieldError(confirmPassword, "Please confirm your password!");
        isValid = false;
    } else if (password.value !== confirmPassword.value){
        showFieldError(confirmPassword, "Passwords do not match!");
        isValid = false;
    }

    if (isValid) {
        form.style.display = "none";
        document.getElementById("success-message").style.display = "block";
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match!");
        return; // Stops here - doesn't send anything
    }
    document.getElementById("success-message").style.display = "block"; // Paswords match - valid form
});

email.addEventListener("input", (event) => {
  if (email.validity.valid) {
    emailError.textContent = ""; // Remove the message content
    emailError.className = "error"; // Removes the `active` class
  } else {
    // If there is still an error, show the correct error
    showError();
  }
});

form.addEventListener("submit", (event) => {
  // if the email field is invalid
  if (!email.validity.valid) {
    // display an appropriate error message
    showError();
    // prevent form submission
    event.preventDefault();
  }
});

// Show error if email box is empty
function showError() {
  if (email.validity.valueMissing) {
    // If empty
    emailError.textContent = "You need to enter an email address.";
  } else if (email.validity.typeMismatch) {
    // If it's not an email address,
    emailError.textContent = "Entered value needs to be an email address.";
  } else if (email.validity.tooShort) {
    // If the value is too short,
    emailError.textContent = `Email should be at least ${email.minLength} characters; you entered ${email.value.length}.`;
  }
  // Add the `active` class
  emailError.className = "error active";
}


function checkPostalCode() {
  // For each country, defines the pattern that the postal code has to follow
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Swiss postal codes must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "French postal codes must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "German postal codes must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Dutch postal codes must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  // Read the country id
  const country = countrySelect.value;

  // Build the constraint checker
  const constraint = new RegExp(constraints[country][0], "");
  console.log(constraint);

  // Check it!
  if (constraint.test(postalCodeField.value)) {
    // The postal code follows the constraint, we use the ConstraintAPI to tell it
    postalCodeField.setCustomValidity("");
  } else {
    // The postal code doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    postalCodeField.setCustomValidity(constraints[country][1]);
  }
}

countrySelect.addEventListener("change", checkPostalCode);
postalCodeField.addEventListener("input", checkPostalCode);

function showFieldError(field, message) {
    field.style.boxShadow = "0 0 8px 2px red";
    field.style.borderColor = "red";
    alert(message);
}

function clearFieldError(field) {
    field.style.boxShadow = "";
    field.style.borderColor = "";
}

[email, postalCodeField, password, confirmPassword].forEach(field => {
    field.addEventListener("input", () => clearFieldError(field));
});