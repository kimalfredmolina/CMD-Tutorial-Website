const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");

let userMessage;
const API_KEY = "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";

let messageCount = 0;
const maxMessages = 3;
let timeoutReset = false;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    }

    fetch(API_URL, requestOptions).then(response => response.json()).then(data => {
        messageElement.textContent = data.choices[0].message.content;
    }).catch((error) => {
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = () => {
    if (timeoutReset) return;
    userMessage = chatInput.value.trim();
    if (!userMessage) return;
    chatInput.value = "";

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    messageCount++;

    if (messageCount >= maxMessages) {
        disableInput();
    }

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming")
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
}

const disableInput = () => {
    chatInput.disabled = true;
    sendChatBtn.disabled = true;
    timeoutReset = true;

    setTimeout(() => {
        chatInput.disabled = false;
        sendChatBtn.disabled = false;
        messageCount = 0;
        timeoutReset = false;
    }, 12 * 60 * 60 * 1000); 
}

chatInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' && !event.repeat) {
        event.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

