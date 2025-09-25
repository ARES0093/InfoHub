# 💡 InfoHub: AI News & Guide Bot

InfoHub is a smart, dual-mode chatbot that serves as your personal intelligence hub. Switch seamlessly between getting **real-time news summaries** on any topic or receiving **personalized guidance** from an advanced AI assistant. Built with a clean **Gradio** interface and powered by the speed of **Groq's LLaMA-3** and the timeliness of **NewsAPI**.

---

## 1. Project Overview 📝

In today's fast-paced digital world, staying informed and getting quick answers is essential. InfoHub is designed to be a one-stop solution for both. It eliminates the need to jump between a news aggregator and a separate AI assistant by integrating two powerful functionalities into a single, intuitive chat interface. Whether you need the latest headlines on technology or a step-by-step guide on a complex topic, InfoHub delivers fast, relevant, and well-structured responses.

---

## 2. The Problem 🤔

* **Information Overload:** Sifting through countless news articles to find what matters is time-consuming.
* **Context Switching:** Users often need to use different applications for different tasks—one for news, another for general AI queries—leading to a fragmented workflow.
* **Accessibility Barrier:** Many powerful APIs and data sources lack a simple, conversational interface for everyday users.

---

## 3. The Solution ✨

InfoHub provides a **centralized and conversational interface** to solve these problems:

* **📰 News Bot Mode:** Acts as a personal news analyst. You ask for a topic, and it fetches the latest articles from NewsAPI, providing a concise summary and direct links, powered by LLaMA-3's summarization capabilities.
* **🧭 General Guide Mode:** Functions as a versatile AI assistant. Ask it to explain concepts, write code, offer suggestions, or brainstorm ideas. It leverages the full creative and logical power of LLaMA-3.
* **Unified Experience:** Both modes are accessible from the same clean UI, allowing users to effortlessly switch between tasks without leaving the chat window.

---

## 4. Technical Approach 🛠️

InfoHub's intelligence is a result of a well-orchestrated backend process:

* **Dual-Mode Logic:** The core of the application is a **Gradio `Radio` selector** that allows the user to switch between "News Bot" and "General Guide" modes. This selection dictates the entire workflow.
* **Conditional Data Fetching:** When in "News Bot" mode, the user's query is first sent to the **NewsAPI**. The application fetches the top 3 most recent and relevant English articles.
* **Dynamic System Prompts:** The bot's "personality" and instructions are controlled by a dynamic system prompt sent to the Groq API.
    * In **News Mode**, the prompt is: *"You are a smart, friendly news assistant bot that delivers updates with warmth and clarity."*
    * In **Guide Mode**, it becomes: *"You are a helpful and friendly assistant."*
* **Context Injection for Summarization:** In News Mode, the titles and URLs of the fetched articles are formatted and **injected as context** directly into the prompt sent to LLaMA-3. This enables the LLM to generate a summary based on real-time, external data.
* **Interactive UI:** The entire frontend is built with **Gradio**, which handles the chat history, input fields, and component state management, making it easy to create a responsive and interactive user experience.

---

## 5. Key Features 🚀

* 🎭 **Dynamic Bot Modes:** Instantly switch between a real-time News Bot and a general-purpose AI Guide.
* 🗞️ **Live News Integration:** Fetches and summarizes the latest articles from across the web using **NewsAPI**.
* 🧠 **High-Speed LLM Responses:** Powered by **Groq's LLaMA-3 API** for near-instantaneous, human-like replies.
* ✨ **Clean & Modern UI:** A responsive and user-friendly interface created with **Gradio**.
* 🔄 **Full Chat History:** The conversation is displayed clearly, making it easy to follow the context.
* 🧹 **One-Click Clear:** A simple "Clear" button to reset the conversation and start fresh.
* 🔒 **Secure API Key Management:** Protects sensitive API keys using a `.env` file.

---

## 6. Project Workflow 🌊

1.  **Initialization:** The user launches the Gradio application.
2.  **Mode Selection:** The user selects either "News Bot" or "General Guide" mode using the radio buttons.
3.  **User Input:** The user types a query into the textbox and presses Enter.
4.  **Workflow Branching:**
    * **If in "News Bot" Mode:**
        1.  The app sends the user's query to the **NewsAPI**.
        2.  It receives up to 3 relevant articles.
        3.  The articles are formatted into a summary block with titles and links.
        4.  This summary block is passed as context, along with the original query, to the **Groq LLaMA-3 API**.
    * **If in "General Guide" Mode:**
        1.  The user's query is sent directly to the **Groq LLaMA-3 API** without any external data.
5.  **Response Generation:** The LLaMA-3 model generates a response based on the given prompt and context.
6.  **UI Update:** The bot's response is displayed in the Gradio chatbot interface, and the chat history is updated.

---

## 7. Tech Stack 💻

| Component          | Technology                                         |
| ------------------ | -------------------------------------------------- |
| **Language** | `Python`                                           |
| **UI Framework** | `Gradio`                                           |
| **LLM Backend** | `Groq API (LLaMA-3)`                               |
| **News API** | `NewsAPI.org`                                      |
| **API Client** | `requests`                                         |
| **Env Management** | `python-dotenv`                                    |

---

## 8. Setup and Installation ⚙️

Follow these steps to get InfoHub running on your local machine.

**Prerequisites:**
* Python 3.8+
* A free API key from [Groq](https://console.groq.com/keys)
* A free API key from [NewsAPI.org](https://newsapi.org/register)

**Steps:**

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/ARES0093/InfoHub.git](https://github.com/ARES0093/InfoHub.git)
    cd InfoHub
    ```

2.  **Create a virtual environment (recommended):**
    ```bash
    # For Windows
    python -m venv venv
    venv\Scripts\activate

    # For macOS/Linux
    python3 -m venv venv
    source venv/bin/activate
    ```

3.  **Install the required dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Set up your environment variables:**
    * Create a new file named `.env` in the project's root directory.
    * Add your API keys to this file. **It requires two keys.**
        ```
        GROQ_API_KEY="your_groq_api_key_here"
        NEWS_API_KEY="your_newsapi_key_here"
        ```

---

## 9. How to Run ▶️

With the setup complete, start the application by running the following command in your terminal:

```bash
python app.py
```

## 10 . Future Improvements 💡
InfoHub is a powerful tool, but it can be made even better. Here are some potential enhancements:

- Activate Sentiment Analysis: The existing sentiment analysis function can be used to tailor the bot's tone (e.g., providing a more empathetic response to negative news).

- Advanced News Filtering: Add options to filter news by specific sources, date ranges, or countries.

- Streaming Responses: Implement response streaming from the Groq API to display the bot's answer token-by-token for a more dynamic feel.

- Clickable News Topics: Make topics or keywords in the bot's response clickable to trigger new searches.

- Deployment: Create a Dockerfile for easy containerization and write instructions for deploying to Hugging Face Spaces, which offers free hosting for Gradio applications.
