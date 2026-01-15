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

/* ============================
   Authentication - Login
   ============================ */

const loginFormSubmit = document.getElementById("login-form");

loginFormSubmit.addEventListener("submit", async (event) => {
    // Para evitar o reload da página
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    try {
        const response = await fetch("http://localhost:3333/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Login failed");
            return;
        }

        // Guardar token
        localStorage.setItem("token", data.token);

        alert("Login successful");

        // Exemplo de ação pós-login
        closeLoginPopup()
    } catch (error) {
        alert("Server error");
    }
});

const getToken = () => {
    return localStorage.getItem("token");
};

const loadUserProfile = async () => {
    const token = getToken();

    if (!token) {
        alert("You must be logged in");
        return;
    }

    try {
        const response = await fetch("http://localhost:3333/api/users/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
            return;
        }

        console.log("Profile:", data);
        alert("Access granted");
    } catch (error) {
        alert("Server error");
    }
};

const logout = () => {
    localStorage.removeItem("token");
    alert("Logged out");
}

    /* ============================
   Registration Form Handling
   ============================ */


const registerFormSubmit = document.getElementById("register-form");

registerFormSubmit.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("register-name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    try {
        const response = await fetch("http://localhost:3333/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message || "Registration failed");
            return;
        }

        alert("Registration successful! You can now log in.");

        // Volta para o login
        showLoginForm();

    } catch (error) {
        alert("Server error");
    }
});
