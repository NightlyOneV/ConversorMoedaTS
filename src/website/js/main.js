"use strict";
/*
    Made by NightlyOne.
    https://github.com/NightlyOneV

    Purposes:
    - Learning more about the typescript syntax.
    - Learning more good practice, as camelCase.
    - Practicing my english.
    
    Project Features:
    - Random password length, ranging from 8 to 14.
    - Big variety of characters allowed, with special characters.
    - Password validation (If it at least has a random number, uppercase, lowercase, special chars, etc..).
*/
// Setting up Variables
const minCharRange = 8;
const maxCharRange = 14;
const allowedChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()';
const charLength = allowedChar.length;
const genButton = document.getElementById("generateButton");
const passLabel = document.getElementById("password");
const indicators = {
    haveUpper: document.getElementById("haveUpper"),
    haveLower: document.getElementById("haveLower"),
    haveNumber: document.getElementById("haveNumber"),
    haveSpecial: document.getElementById("haveSpecial"),
    howLength: document.getElementById("howLength"),
};
const indicatorTXT = {
    hasUppercase: {
        true: "✅ Has Uppercase ✅",
        false: "❌ Has Uppercase ❌",
    },
    hasLowercase: {
        true: "✅ Has Lowercase ✅",
        false: "❌ Has Lowercase ❌",
    },
    hasNumber: {
        true: "✅ Has Number ✅",
        false: "❌ Has Number ❌",
    },
    hasSpecial: {
        true: "✅ Has SpecialChar ✅",
        false: "❌ Has SpecialChar ❌",
    },
    passLength: (length) => `Password Length: ${length}`
};
// Functions
function setIndicator(id, value) {
    // Modifying the text of a html element (that has text content)
    const htmlElement = indicators[id];
    if (!htmlElement) {
        alert(`Error! HTML ID Element not found ${id}`);
    }
    if (typeof (value) === "boolean") {
        //TODO
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
    return hasUppercase && hasLowercase && hasNumbers && hasSpecial;
}
function newPassword() {
    // Will generate a new password and validate it.
    const password = generatePassword();
    const isSecure = passwordValidation(password);
    passLabel.textContent = password;
    console.log(`Your random password was generated: ${password}`);
    if (isSecure) {
        return "✅ | Your password is strong and secure, remember to save it!";
    }
    else {
        return "❌ | Your password is weak and unsafe, you can try again if you want.";
    }
}
// Callback
genButton.addEventListener("click", () => {
    newPassword();
});
