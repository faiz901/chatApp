// JavaScript functions to toggle between signup and login forms
let signupForm = document.getElementById("signup-form");
let loginForm = document.getElementById("login-form");
let signupTab = document.getElementById("signup");
let loginTab = document.getElementById("login");
let signupBtn = document.getElementById("signup-btn");
let loginBtn = document.getElementById("login-btn");
let logo = document.getElementById("logo-container");
let closeErr = document.getElementById("closeErr");
let messageAge = document.getElementsByClassName("card-footer");

let errorContainer = document.getElementsByClassName("error-message")[0];

function signup() {
  if (!signupForm.classList.contains("active")){
    errorContainer.style.display = "none";
  }
  loginForm.classList.remove("active");
  loginTab.classList.remove("active");
  signupForm.classList.add("active");
  signupTab.classList.add("active");
  logo.style.borderTopLeftRadius = "0rem";
  logo.style.borderTopRightRadius = "0.5rem";
}

function login(user = null) {
  document.getElementById("userid").value = null;
  if (user !== null) {
    document.getElementById("userid").value = user;
  }
  if (!loginForm.classList.contains("active")){
    errorContainer.style.display = "none";
  }
  signupForm.classList.remove("active");
  signupTab.classList.remove("active");
  loginForm.classList.add("active");
  loginTab.classList.add("active");
  logo.style.borderTopRightRadius = "0rem";
  logo.style.borderTopLeftRadius = "0.5rem";
}

document.getElementById("signup").addEventListener("click", signup);
document.getElementById("login").addEventListener("click", login);

document.addEventListener("DOMContentLoaded", function () {
  login("");
});

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (validate(event.target[0].value, event.target[0].value)) {
    loginAttempt(event.target[0].value);
  }
});

signupForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let username = event.target[0].value;
  let email = event.target[1].value;
  let valid = validate(username, email);
  if (valid) {
    signupAttempt(username, email);
    login(event.target[0].value);
  }
});

const validate = (name, email) => {
  let errorMessage = document.getElementById("errMsg");
  logo.style.borderTopRightRadius = "0rem";
  logo.style.borderTopLeftRadius = "0rem";

  if (name == "" || email == "") {
    errorContainer.style.display = "block";
    errorMessage.innerHTML = "Empty Fields are not allowed!";
    return false;
  }
  return true;
};
closeErr.addEventListener("click", () => {
  errorContainer.style.display = "none";
});

const loginAttempt = (userId) => {
  var formData = `userId=${userId}`;
  fetch("http://localhost/chatApp/backend/loginHandler.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.access !== "granted") {
        let errorMessage = document.getElementById("errMsg");
        logo.style.borderTopRightRadius = "0rem";
        logo.style.borderTopLeftRadius = "0rem";
        errorContainer.style.display = "block";
        errorMessage.innerHTML = "User not found!";
      }
      else {
        window.location.href = 'mainApp/chatroom.html';
      }
      console.log(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
const signupAttempt = (username,email) => {
  var formData = `username=${username}&email=${email}`;
  fetch("backend/signupHandler.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  })
    .then((response) => {
      return response.json()
    })
    .then((response) => {
      if (!response.registered) {
        let errorMessage = document.getElementById("errMsg");
        logo.style.borderTopRightRadius = "0rem";
        logo.style.borderTopLeftRadius = "0rem";
        errorContainer.style.display = "block";
        errorMessage.innerHTML = "Error registering user!";
      }
      console.log(response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
