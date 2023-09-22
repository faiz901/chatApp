 // JavaScript functions to toggle between signup and login forms
 let signupForm = document.getElementById('signup-form');
 let loginForm = document.getElementById('login-form')
 let signupTab =  document.getElementById('signup');
 let loginTab =  document.getElementById('login');
 let signupBtn = document.getElementById('signup-btn');
 let loginBtn = document.getElementById('login-btn');
 let logo = document.getElementById('logo-container');
 let closeErr = document.getElementById('closeErr');

 let errorContainer = document.getElementsByClassName('error-message')[0];

 function signup() {
  loginForm.classList.remove('active');
  loginTab.classList.remove('active');
  signupForm.classList.add('active');
  signupTab.classList.add('active');
  logo.style.borderTopLeftRadius = "0rem";
  logo.style.borderTopRightRadius = "0.5rem";
}

function login() {
  signupForm.classList.remove('active');
  signupTab.classList.remove('active');
  loginForm.classList.add('active');
  loginTab.classList.add('active');
  logo.style.borderTopRightRadius = "0rem";
  logo.style.borderTopLeftRadius = "0.5rem";

}

document.getElementById('signup').addEventListener('click', signup);
document.getElementById('login').addEventListener('click', login);

// document.querySelectorAll('form').forEach(element =>{
//   element.addEventListener("submit",function(event){
//     event.preventDefault();
//     console.log("form submitted");
    

//   });
// });
document.addEventListener('DOMContentLoaded', function () {
  login();
});


loginForm.addEventListener("submit",(event)=> {
  event.preventDefault();
  console.log(event);
  validate(event.target[0].value,event.target[0].value);

});

signupForm.addEventListener("submit",(event)=> {
  event.preventDefault();
  console.log(event);
  validate(event.target[0].value,event.target[1].value);
});

const validate = (name, email) => {
  let errorMessage = document.getElementById('errMsg')
  logo.style.borderTopRightRadius = "0rem";
  logo.style.borderTopLeftRadius = "0rem";
    
  console.log("inside validate");
  if(name == "" || email == "") {
    errorContainer.style.display = 'block';
    errorMessage.innerHTML = "Empty Fields are not allowed!";
    
  }
  
  closeErr.addEventListener("click",() =>{
    errorContainer.style.display = 'none';
    console.log('should close')
  });
}