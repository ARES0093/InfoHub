const chatOutput = document.getElementById("chat-output");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", handleUserInput);
userInput.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        handleUserInput();
    }
});

async function handleUserInput() {
    const query = userInput.value;
    if (query.trim() === "") return;

    const userMessage = createUserMessage(query);
    addMessageToChat(userMessage);

    // Fetch stock market information
    const response = await fetchStockData(query);
    const botMessage = createBotMessage(response);
    addMessageToChat(botMessage);

    // Clear user input
    userInput.value = "";
}

function createUserMessage(text) {
    const message = document.createElement("div");
    message.classList.add("message", "user-message");
    message.textContent = text;
    return message;
}

async function fetchStockData(query) {
    const API_KEY = 'YOUR_ALPHA_VANTAGE_API_KEY'; // Replace with your Alpha Vantage API key
    const symbol = query.trim().toUpperCase(); // Convert to uppercase for the API request
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data["Time Series (5min)"]) {
            const timeSeries = data["Time Series (5min)"];
            const latestTimestamp = Object.keys(timeSeries)[0];
            const latestData = timeSeries[latestTimestamp];
            const stockInfo = `Stock: ${symbol}\nPrice: ${latestData["1. open"]}\nHigh: ${latestData["2. high"]}\nLow: ${latestData["3. low"]}\nClose: ${latestData["4. close"]}`;
            return stockInfo;
        } else {
            return "Sorry, I couldn't find information on that stock symbol. Please try another.";
        }
    } catch (error) {
        console.error("Error fetching stock data:", error);
        return "An error occurred while fetching stock data. Please try again later.";
    }
}

function createBotMessage(text) {
    const message = document.createElement("div");
    message.classList.add("message", "bot-message");
    message.textContent = text;
    return message;
}

function addMessageToChat(message) {
    chatOutput.appendChild(message);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
