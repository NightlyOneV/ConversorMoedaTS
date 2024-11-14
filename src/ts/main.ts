/*
    Made by NightlyOne.
    https://github.com/NightlyOneV

    Purposes:
    - Learning more about the typescript syntax.
    - Learning HTML and TailwindCSS.
    - Learning more good practice, as camelCase.
    - Practicing my english.
    
    Project Features:
    - Random password length, ranging from 8 to 24.
    - Big variety of characters allowed, with special characters.
    - Password validation (If it at least has a random number, uppercase, lowercase, special chars, etc..).

    TailwindCSS build:
    - npx tailwindcss -i ./src/website/styles/input.css -o ./src/website/styles/output.css --watch
*/

// Setting up Variables
const minCharRange : number = 8
const maxCharRange : number = 24
const allowedChar  : string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%&*()'
const charLength   : number = allowedChar.length
const genButton    : any    = document.getElementById("generateButton")
const passLabel    : any    = document.getElementById("password")

const indicators   : Record<string, HTMLElement | null> = {
    // Getting the html elements from their ID
    haveUpper: document.getElementById("haveUpper")     as HTMLHeadingElement,
    haveLower: document.getElementById("haveLower")     as HTMLHeadingElement,
    haveNumber: document.getElementById("haveNumber")   as HTMLHeadingElement,
    haveSpecial: document.getElementById("haveSpecial") as HTMLHeadingElement,
    howLength: document.getElementById("howLength")     as HTMLHeadingElement,
    isSafe: document.getElementById("isSafe")           as HTMLHeadingElement,
}

const indicatorTXT : Record<string, any>  = {
    // Saving the text templates by each different element id
    haveUpper: {
        true : "✅ Has Uppercase ✅",
        false: "❌ Has Uppercase ❌",
    },
    
    haveLower: {
        true : "✅ Has Lowercase ✅",
        false: "❌ Has Lowercase ❌",
    },
    
    haveNumber: {
        true : "✅ Has Number ✅",
        false: "❌ Has Number ❌",
    },
    
    haveSpecial: {
        true : "✅ Has SpecialChar ✅",
        false: "❌ Has SpecialChar ❌",
    },

    isSafe: {
        true : "🌟 | Your password is strong and secure, remember to save it!",
        false: "💔 | Your password is weak and can be unsafe, you can regenerate if you want!",
    },

    passLength: (length: number) => `📏 | Password Length: ${length}`
}

// Functions

function setIndicator(id: string, value: boolean | number){
    // Modifying the text of a html element (that has text content)
    const htmlElement: HTMLElement | null = indicators[id]

    if (!htmlElement){
        alert(`Error! HTML ID Element not found ${id}`)
        return
    }
        
    // Type checking
    if (typeof(value) === "boolean"){
        htmlElement.textContent = indicatorTXT[id][value.toString()] 
    } else if (typeof value === "number") {
        htmlElement.textContent = indicatorTXT.passLength(value)
    } else { alert("Not a valid value"); return }

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
    const safety      : boolean = (hasUppercase && hasLowercase && hasNumbers && hasSpecial)

    //Setting the html text elements
    setIndicator("haveUpper", hasUppercase)
    setIndicator("haveLower", hasLowercase)
    setIndicator("haveNumber", hasNumbers)
    setIndicator("haveSpecial", hasSpecial)
    setIndicator("howLength", length)
    setIndicator("isSafe", safety)


    return safety
}

function newPassword(): void{
    // Will generate a new password and validate it.
    const password: string  = generatePassword()
    const isSecure: boolean = passwordValidation(password)
    
    passLabel.textContent   = password
}

// Callback
genButton.addEventListener("click", () =>{
    // On click it will begin the password generation
    newPassword()
})

