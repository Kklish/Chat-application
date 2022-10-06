
const socket = io('http://127.0.0.1:8000',{
    transports: ["websocket"]
  });

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector(".container") // to put all the messages to the containerL

var audio = new Audio('ting_iphone.mp3');
const append = (message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if(position == 'left'){
        audio.play();
    }
    
}


form.addEventListener('submit',(e)=>{
    e.preventDefault();//doesnt reloads
    const message = messageInput.value;
    append(`You: ${message}`,'right');
    socket.emit('send',message);//messgae input area will not be blank after submitting
    messageInput.value = '';
})


const nam = prompt("Enter your name to join");
socket.emit('new-user-joined', nam )

socket.on('user-joined',name=>{
    append(`${name} joined the chat`,'right')
})
socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,'left')
})
socket.on('left',name=>{
    append(`${name} left the chat`,'right')
})