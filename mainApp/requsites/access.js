let currentUser;
const fetchSessionData = () => {
  fetch("http://localhost/chatApp/backend/sessionData.php")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      console.log(response);
      if(response.access !== "granted")
        window.location.href = "../"

      currentUser = new User(response.username,response.email,Date.now(),response.userid);
      console.log('user created')
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
document.addEventListener('DOMContentLoaded', () => {
  fetchSessionData();
  setInterval(() => {
    fetchSessionData();
    console.log(currentUser);  
  }, 30000);
let custommessage = Message.getInstance("this is custom","faiz","me", 1696579428000) 

});