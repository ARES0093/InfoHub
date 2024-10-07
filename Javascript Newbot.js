const BASE_URL = "https://newsapi.org/v2/everything";
const API_KEY = "da8cb35579b94a03954700a9b6b78a6a";



const chatContainer = document.getElementById("chat-container");
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
  const topic = userInput.value;
  if (topic.trim() === "") return;

  const userMessage = createUserMessage(topic);
  addMessageToChat(userMessage);

  // Fetch news and add bot message to chat output
  const news = await fetchNews(topic);
  const botMessage = createBotMessage(news);
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

async function fetchNews(topic) {
  const query = encodeURIComponent(topic);
  const url = `${BASE_URL}?q=${query}&apiKey=${API_KEY}`;
  // console.log(url);

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.articles.slice(0, 5);
  } catch (error) {
    console.error(error);
    return [];
  }
}

function createBotMessage(articles) {
  const message = document.createElement("div");
  message.classList.add("message", "bot-message");

  if (articles.length === 0) {
    message.textContent = "I'm Unable To Locate Any News On Related To That Topic.";
  } else {
    const articleList = document.createElement("ul");
    articleList.classList.add("article-list");

    for (const article of articles) {
      const listItem = document.createElement("li");

      const link = document.createElement("a");
      link.href = article.url;
      link.target="_blank"
      link.textContent = article.title;

      const description = document.createElement("p");
      description.classList.add("description");
      description.textContent = article.description;

      const source = document.createElement("p");
      source.classList.add("source");
      source.textContent = `Source: ${article.source.name}`;

      listItem.appendChild(link);
      listItem.appendChild(description);
      listItem.appendChild(source);
      articleList.appendChild(listItem);
    }
    message.appendChild(articleList);
  }

  return message;
}

function addMessageToChat(message) {
  chatOutput.appendChild(message);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}
