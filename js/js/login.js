/* =========================================================
   CHOICENEST LOGIN
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    const emailInput =
        document.getElementById("email");

    const passwordInput =
        document.getElementById("password");

    const error =
        document.getElementById("error");

    const showPassword =
        document.getElementById("showPassword");

    const forgotPassword =
        document.getElementById("forgotPassword");


    /* =====================================================
       SHOW / HIDE PASSWORD
       ===================================================== */

    showPassword.addEventListener("click", () => {

        if (passwordInput.type === "password") {

            passwordInput.type = "text";

            showPassword.textContent = "🙈";

        } else {

            passwordInput.type = "password";

            showPassword.textContent = "👁";
        }

    });


    /* =====================================================
       LOGIN
       ===================================================== */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        error.textContent = "";

        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value;


        if (!email || !password) {

            error.textContent =
                "Please enter your email and password.";

            return;
        }


        const user =
            JSON.parse(
                localStorage.getItem("cn_user") || "null"
            );


        /*
         * Demo account system
         */

        if (!user) {

            error.textContent =
                "No account found. Please create an account first.";

            return;
        }


        if (
            user.email.toLowerCase() !==
            email.toLowerCase()
        ) {

            error.textContent =
                "Email address is not registered.";

            return;
        }


        if (user.password !== password) {

            error.textContent =
                "Incorrect password. Please try again.";

            return;
        }


        /* Login successful */

        localStorage.setItem(
            "cn_logged_in",
            "true"
        );


        /* Button animation */

        const button =
            form.querySelector(".login-btn");

        button.innerHTML =
            `<span>Welcome back!</span> ✓`;

        button.style.pointerEvents =
            "none";


        /* Redirect */

        setTimeout(() => {

            window.location.href =
                "../index.html";

        }, 900);

    });


    /* =====================================================
       FORGOT PASSWORD
       ===================================================== */

    forgotPassword.addEventListener("click", (event) => {

        event.preventDefault();

        const user =
            JSON.parse(
                localStorage.getItem("cn_user") || "null"
            );

        if (!user) {

            error.textContent =
                "No account found. Please create an account first.";

            return;
        }

        alert(
            "Demo website: Password recovery would be sent to " +
            user.email
        );

    });


    /* =====================================================
       SOCIAL LOGIN DEMO
       ===================================================== */

    document.querySelectorAll(".social-btn")
        .forEach(button => {

            button.addEventListener("click", () => {

                alert(
                    "Social login is currently a demo feature."
                );

            });

        });

});