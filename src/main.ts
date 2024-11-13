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

// Function
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

    return hasUppercase && hasLowercase && hasNumbers && hasSpecial
}

function newPassword(): void{
    // Will generate a new password and validate it.
    const password: string = generatePassword()
    const isSecure: boolean = passwordValidation(password)

    console.log(`Your random password was generated: ${password}`)

    if (isSecure) {
        console.log("✅ | Your password is strong and secure, remember to save it!")
    } else {
        console.log("❌ | Your password is weak and unsafe, you can try again if you want.")
    }

}

// Callback
newPassword()

