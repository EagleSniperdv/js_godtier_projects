const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMsg;

const handleChat = () => {
    userMsg = chatInput.value.trim();
    if(!userMsg) {
        alert('Enter text//')
    }
    console.log(userMsg);
}


sendChatBtn.addEventListener("click",handleChat)