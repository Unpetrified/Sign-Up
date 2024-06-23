// import { passwordStrength } from "node_modules/check-password-strength/dist/index.js";

// console.log(passwordStrength("ksio309iew").value);

let inputs = document.querySelectorAll("input"),
    confirm_password = document.querySelector("#confirm"),
    form = document.querySelector("form"),
    show_password = document.querySelector(".show-password"),
    phone = document.querySelector("#phone");

inputs.forEach((input) => {
    input.addEventListener("change", checkValidity);
})

form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (checkPassword() && checkPhone()) {
        location.reload()
    }
});

show_password.addEventListener('click', togglePassword);

confirm_password.addEventListener("change", checkPassword);

phone.addEventListener("change", checkPhone);


function checkValidity(e) {
    e.target.value ? e.target.classList.add("is-valid") : e.target.classList.remove("is-valid");
}

function checkPassword() {
    let errorMessage = document.querySelector(".error"),
        formIn = createFormObject(),
        password = formIn.getAll("password"),
        valid;

    if (password[0] !== password[1]) {
        confirm_password.classList.add("password");
        errorMessage.style.display = "block";
        valid = false;
    } else {
        confirm_password.classList.remove("password");
        errorMessage.style.display = "none";
        valid = true;
    }

    return valid;
}

function togglePassword(e) {
    e.preventDefault();
    let password = document.querySelector("#password");

    if (password.getAttribute("type") === "password") {
        password.setAttribute("type", "text");
        confirm_password.setAttribute("type", "text");
        show_password.textContent = "Hide Password";
    } else {
        password.setAttribute("type", "password");
        confirm_password.setAttribute("type", "password");
        show_password.textContent = "Show Password";
    }
}

function checkPhone() {
    let formIn = createFormObject(),
        errorMessage = document.querySelector(".phone-error"),
        valid,
        phone_number = formIn.get("phone");

    if(phone_number.match(/^(?:(?:(?:\+?234(?:\h1)?|01)\h*)?(?:\(\d{3}\)|\d{3})|\d{4})(?:\W*\d{3})?\W*\d{4}$/)) {

        valid = true;
        errorMessage.style.display = "none";
    } else {
        
        valid = false;
        errorMessage.style.display = "block";
    } 
    
    return valid
}

function createFormObject() {
    let formEl = document.forms.contactForm,
        formIn = new FormData(formEl);

    return formIn
}