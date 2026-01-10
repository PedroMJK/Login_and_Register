const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopup = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const loginForm = document.querySelector(".form-box.login form");
const registerForm = document.querySelector(".form-box.register form");

// Helpers
const clearForm = (form) => {
    if (form) form.reset();
};


// Auth
const showRegisterForm = () => {
    wrapper.classList.add("is-active")
    clearForm(loginForm)
}

const showLoginForm = () => {
    wrapper.classList.remove("is-active")
    clearForm(registerForm)
} 

const openLoginPopup = () =>{
    wrapper.classList.add("is-active-popup")
     wrapper.classList.remove("is-active");
}

const closeLoginPopup = () => {
    wrapper.classList.remove("is-active-popup");
}


// Navigation
const toggleNavigationMenu = () => {
    navigation.classList.toggle("active");
}

const closeNavigationMenu = () => {
    navigation.classList.remove("active")
}


// Password
const togglePasswordVisibility = (input, icon) => {
    const isPassword = input.type === "password";
    input.type = isPassword ? "text" : "password";
    icon.setAttribute(
        "name",
        isPassword ? "eye-outline" : "eye-off-outline"
    );
};

document.querySelectorAll(".password-box").forEach(box => {
    const input = box.querySelector(".password-input");
    const icon = box.querySelector(".eye-icon");
    const toggleButton = box.querySelector(".toggle-password");

    toggleButton.addEventListener("click", () => {
        togglePasswordVisibility(input, icon);
    });
});


registerLink.addEventListener("click", showRegisterForm)
loginLink.addEventListener("click", showLoginForm)
btnPopup.addEventListener("click", openLoginPopup)
iconClose.addEventListener("click", closeLoginPopup)
menuToggle.addEventListener("click", toggleNavigationMenu)
navigation
    .querySelectorAll("a, button")
    .forEach(item => {
        item.addEventListener("click", closeNavigationMenu)
    })

