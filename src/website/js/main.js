"use strict";
/*
    Made by NightlyOne.
    https://github.com/NightlyOneV

    Purposes:
    - Learning more about the typescript syntax.
    - Learning HTML and TailwindCSS.
    - Learning more good practice, as camelCase.
    - Practicing my english.
    
    Project Features:
    - Random password length, ranging from 8 to 14.
    - Big variety of characters allowed, with special characters.
    - Password validation (If it at least has a random number, uppercase, lowercase, special chars, etc..).

    TailwindCSS build:
    - npx tailwindcss -i ./src/website/styles/input.css -o ./src/website/styles/output.css --watch
*/
// Setting up Variables
const minCharRange = 8;
const maxCharRange = 24;
const allowedChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()';
const charLength = allowedChar.length;
const genButton = document.getElementById("generateButton");
const passLabel = document.getElementById("password");
const indicators = {
    // Getting the html elements from their ID
    haveUpper: document.getElementById("haveUpper"),
    haveLower: document.getElementById("haveLower"),
    haveNumber: document.getElementById("haveNumber"),
    haveSpecial: document.getElementById("haveSpecial"),
    howLength: document.getElementById("howLength"),
    isSafe: document.getElementById("isSafe"),
};
const indicatorTXT = {
    // Saving the text templates by each different element id
    haveUpper: {
        true: "✅ Has Uppercase ✅",
        false: "❌ Has Uppercase ❌",
    },
    haveLower: {
        true: "✅ Has Lowercase ✅",
        false: "❌ Has Lowercase ❌",
    },
    haveNumber: {
        true: "✅ Has Number ✅",
        false: "❌ Has Number ❌",
    },
    haveSpecial: {
        true: "✅ Has SpecialChar ✅",
        false: "❌ Has SpecialChar ❌",
    },
    isSafe: {
        true: "🌟 | Your password is strong and secure, remember to save it!",
        false: "💔 | Your password is weak and can be unsafe, you can regenerate if you want!",
    },
    passLength: (length) => `📏 | Password Length: ${length}`
};
// Functions
function setIndicator(id, value) {
    // Modifying the text of a html element (that has text content)
    const htmlElement = indicators[id];
    if (!htmlElement) {
        alert(`Error! HTML ID Element not found ${id}`);
        return;
    }
    // Type checking
    if (typeof (value) === "boolean") {
        htmlElement.textContent = indicatorTXT[id][value.toString()];
    }
    else if (typeof value === "number") {
        htmlElement.textContent = indicatorTXT.passLength(value);
    }
    else {
        alert("Not a valid value");
        return;
    }
}
function getRandomNumber() {
    // Returning a random number between minCharRange and maxCharRange
    return Math.floor(Math.random() * (maxCharRange - minCharRange + 1)) + minCharRange;
}
function generatePassword() {
    // Generate a random password of random length
    const length = getRandomNumber();
    let password = "";
    for (let i = 0; i < length; i++) {
        password += allowedChar.charAt(Math.floor(Math.random() * charLength));
    }
    return password;
}
function passwordValidation(password) {
    // Returning a boolean based on the password strength.
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecial = /[!@#$%&*()]/.test(password);
    const length = password.length;
    const safety = (hasUppercase && hasLowercase && hasNumbers && hasSpecial);
    //Setting the html text elements
    setIndicator("haveUpper", hasUppercase);
    setIndicator("haveLower", hasLowercase);
    setIndicator("haveNumber", hasNumbers);
    setIndicator("haveSpecial", hasSpecial);
    setIndicator("howLength", length);
    setIndicator("isSafe", safety);
    return safety;
}
function newPassword() {
    // Will generate a new password and validate it.
    const password = generatePassword();
    const isSecure = passwordValidation(password);
    passLabel.textContent = password;
}
// Callback
genButton.addEventListener("click", () => {
    // On click it will begin the password generation
    newPassword();
});
