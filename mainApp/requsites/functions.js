let inputGroup = document.getElementById('input-group');
let newMessage = document.getElementById("new-message");
let messageContainer = document.getElementById('message-container');
let newMessageForm = document.getElementById('new-message-form');
let messagesClass = document.getElementsByClassName("card-footer");

let messages = Array();

getUserName = () => {
  return currentUser.name;
}

function getMessageAge(messageTimestamp) {
  const messageDate = new Date(messageTimestamp);

  const currentDate = new Date();

  const timeDifference = currentDate - messageDate;

  const minute = 60 * 1000; 
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day; 

  if (timeDifference < minute) {
    return 'Just now';
  } else if (timeDifference < hour) {
    const minutesAgo = Math.floor(timeDifference / minute);
    return `${minutesAgo} minute${minutesAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < day) {
    const hoursAgo = Math.floor(timeDifference / hour);
    return `${hoursAgo} hour${hoursAgo > 1 ? 's' : ''} ago`;
  } else if (timeDifference < week) {
    const daysAgo = Math.floor(timeDifference / day);
    if (daysAgo === 1) {
      return 'Yesterday';
    } else {
      return `${daysAgo} days ago`;
    }
  } else {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return messageDate.toLocaleDateString(undefined, options);
  }
}


class Message {
  constructor(text,msgSender, msgReciever, msgTimestamp, lastMsgTimeStamp) {
    this.messageText = text;
    this.sender = msgSender;
    this.reciever=msgReciever;
    this.timestamp = msgTimestamp;
  }
  time() {
    return this.timestamp;
  }
  makemessage (){
    if(this.sender === getUserName()) {
      var from = 'by-me';
    }
    else {
      var from = 'not-by-me';
    }
    return `<div class="card message" ${from} id="message-1">
              <div class="card-body">
                <div class="card-text">${this.messageText}</div>
              </div>
              <div class="card-footer text-body-secondary">${getMessageAge(this.timestamp)}</div>
            </div>`
  }
  appendmessage () {
    let thismessage = this.makemessage();
    messageContainer.innerHTML += thismessage;
  }
  static getInstance(text,msgSender, msgReciever, msgTimestamp) {
      Message.instance = new Message(text,msgSender, msgReciever, msgTimestamp);
      Message.instance.appendmessage();
      messages.push(Message.instance);
    return Message.instance;
  }
}

updateage = () => {
  messages.forEach((instance,index) => {
    age = getMessageAge(instance.timestamp);
    messagesClass[index].innerHTML = age; 
  })
};

  setInterval(() => {
    updateage();
  },1000);