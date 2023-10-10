newMessage.addEventListener("focus",()=>{
  inputGroup.classList.add('active');
});

newMessage.addEventListener("blur",()=>{
  inputGroup.classList.remove('active');
});

newMessageForm.addEventListener("submit",function(event) {
  event.preventDefault();
  let message = document.getElementById('new-message');

  let newmessage = Message.getInstance(message.value,currentUser.name,"any",Date.now());
  console.log(newmessage);

  message.value = '';
  message.blur();
  inputGroup.classList.remove('active');
});