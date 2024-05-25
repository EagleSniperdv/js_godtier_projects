const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatBox = document.querySelector(".chatbox");


let userMsg;


const createChatLi = (message,className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = () => {
    const API_URL = "https://api.openai.com/v1/chat/completions";

    const reqOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${_}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo-16k",
            messages: [{
                role: "system",
                content: userMsg
            }]
        })
    }

    fetch(API_URL, reqOptions)
        .then(res => {
            if (!res.ok) {
                return res.json().then(errorData => {
                    // Handle specific HTTP error statuses
                    if (res.status === 429) {
                        throw new Error("Rate limit exceeded. Please try again later.");
                    } else if (res.status === 402) {
                        throw new Error("Insufficient quota. Please check your plan and billing details.");
                    } else {
                        throw new Error(`Error: ${errorData.error.message}`);
                    }
                });
            }
            return res.json();
        })
        .then(data => {
            console.log(data);
            if (!data) {
                alert("Error fetching response.");
            }
        })
        .catch(e => {
            // Display error message to the user
            alert(e.message);
        });
}


const handleChat = () => {
    userMsg = chatInput.value.trim();
    if(!userMsg) {
        alert('Enter text//')
    }
    // console.log(userMsg);

    chatBox.appendChild(createChatLi(userMsg,"outgoing"));

    setTimeout(() => {
        chatBox.appendChild(createChatLi("Thinking...","incoming"));
        generateResponse();
    }, 600);
}


sendChatBtn.addEventListener("click",handleChat);


