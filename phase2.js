
// =====================================
// 1. USER CLASS
// =====================================

class User {

    constructor(name, email, password, confirmPassword) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }

    // Name validation
    validateName() {
        return this.name.trim().length >= 3;
    }

    // Email validation
    validateEmail() {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(this.email);
    }

    // Password validation
    validatePassword() {
        const passwordPattern =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        return passwordPattern.test(this.password);
    }

    // Confirm password validation
    validateConfirmPassword() {
        return this.password === this.confirmPassword;
    }
}


// =====================================
// 2. SELECT HTML ELEMENTS
// =====================================

const form = document.getElementById("registrationForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput =
    document.getElementById("confirmPassword");

const successMessage =
    document.getElementById("successMessage");


// =====================================
// 3. ERROR HANDLING FUNCTIONS
// =====================================

function showError(field, message) {

    document.getElementById(field + "Error").textContent = message;

    document.getElementById(field).classList.add("invalid");

    document.getElementById(field).classList.remove("valid");

}


function clearError(field) {

    document.getElementById(field + "Error").textContent = "";

    document.getElementById(field).classList.remove("invalid");

    document.getElementById(field).classList.add("valid");

}


// =====================================
// 4. FORM SUBMISSION
// =====================================

form.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get input values

    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;


    // Create User object

    const user = new User(
        name,
        email,
        password,
        confirmPassword
    );


    let isValid = true;

    successMessage.textContent = "";


    // =================================
    // 5. NAME VALIDATION
    // =================================

    if (!user.validateName()) {

        showError(
            "name",
            "Name must contain at least 3 characters."
        );

        isValid = false;

    } else {

        clearError("name");

    }


    // =================================
    // 6. EMAIL VALIDATION
    // =================================

    if (!user.validateEmail()) {

        showError(
            "email",
            "Please enter a valid email address."
        );

        isValid = false;

    } else {

        clearError("email");

    }


    // =================================
    // 7. PASSWORD VALIDATION
    // =================================

    if (!user.validatePassword()) {

        showError(
            "password",
            "Password must contain at least 8 characters, uppercase, lowercase, number and special character."
        );

        isValid = false;

    } else {

        clearError("password");

    }


    // =================================
    // 8. CONFIRM PASSWORD VALIDATION
    // =================================

    if (!user.validateConfirmPassword()) {

        showError(
            "confirmPassword",
            "Passwords do not match."
        );

        isValid = false;

    } else {

        clearError("confirmPassword");

    }


    // =================================
    // 9. FINAL RESULT
    // =================================

    if (isValid) {

        successMessage.textContent =
            "Registration successful!";

        console.log("Registered User:", {
            name: user.name,
            email: user.email
        });

        form.reset();

        document.querySelectorAll("input").forEach(input => {
            input.classList.remove("valid");
            input.classList.remove("invalid");
        });

    }

});
