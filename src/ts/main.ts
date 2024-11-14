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
const minCharRange : number = 8
const maxCharRange : number = 14
const allowedChar  : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()'
const charLength   : number = allowedChar.length
const genButton    : any    = document.getElementById("generateButton")
const passLabel    : any    = document.getElementById("password")

const indicators   : any    = {
    haveUpper: document.getElementById("haveUpper")     as HTMLHeadingElement,
    haveLower: document.getElementById("haveLower")     as HTMLHeadingElement,
    haveNumber: document.getElementById("haveNumber")   as HTMLHeadingElement,
    haveSpecial: document.getElementById("haveSpecial") as HTMLHeadingElement,
    howLength: document.getElementById("howLength")     as HTMLHeadingElement,
};

const indicatorTXT : any    = {
    
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

    passLength: (length: number) => `Password Length: ${length}`
}

// Functions

function setIndicator(id: string, value: boolean | string){
    // Modifying the text of a html element (that has text content)
    const htmlElement = indicators[id]

    if (!htmlElement){
        alert(`Error! HTML ID Element not found ${id}`)
    }
        
    if (typeof(value) === "boolean"){
        //TODO
    }

}

function getRandomNumber(): number{
    // Returning a random number between minCharRange and maxCharRange
    return Math.floor(Math.random() * (maxCharRange - minCharRange + 1)) + minCharRange
}

function generatePassword(): string{
    // Generate a random password of random length
    const length: number = getRandomNumber()
    let password: string = ""

    for (let i: number = 0; i < length; i++){
        password += allowedChar.charAt(Math.floor(Math.random() * charLength))
    }

    return password
}

function passwordValidation(password: string): boolean{
    // Returning a boolean based on the password strength.
    const hasUppercase: boolean = /[A-Z]/      .test(password)
    const hasLowercase: boolean = /[a-z]/      .test(password)
    const hasNumbers  : boolean = /\d/         .test(password)
    const hasSpecial  : boolean = /[!@#$%&*()]/.test(password)
    const length      : number  =              password.length

    return hasUppercase && hasLowercase && hasNumbers && hasSpecial
}

function newPassword(): string{
    // Will generate a new password and validate it.
    const password: string  = generatePassword()
    const isSecure: boolean = passwordValidation(password)
    
    passLabel.textContent   = password

    console.log(`Your random password was generated: ${password}`)

    if (isSecure) {
        return "✅ | Your password is strong and secure, remember to save it!"
    } else {
        return "❌ | Your password is weak and unsafe, you can try again if you want."
    }

}

// Callback
genButton.addEventListener("click", () =>{
    newPassword()
})

