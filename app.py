import gradio as gr
import requests
import os
from dotenv import load_dotenv

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

def analyze_sentiment(text):
    text = text.lower()
    if any(word in text for word in ["happy", "great", "love", "awesome", "good"]):
        return "positive"
    elif any(word in text for word in ["sad", "bad", "angry", "terrible", "hate"]):
        return "negative"
    return "neutral"

def fetch_news(query):
    url = f"https://newsapi.org/v2/everything?q={query}&language=en&sortBy=publishedAt&pageSize=3&apiKey={NEWS_API_KEY}"
    response = requests.get(url)
    return response.json().get("articles", [])

def construct_news_block(articles):
    if not articles:
        return "😔 Sorry, I couldn't find any recent news on that topic."
    result = ""
    for article in articles:
        title = article.get("title", "No title")
        url = article.get("url", "#")
        result += f"🗞️ **{title}**\n🔗 [Read more]({url})\n\n"
    return result

def get_llm_response(prompt, mode, context):
    role = "You are a helpful and friendly assistant."
    if mode == "News Bot":
        role = "You are a smart, friendly news assistant bot that delivers updates with warmth and clarity."

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3-8b-8192",
        "messages": [
            {"role": "system", "content": role},
            {"role": "user", "content": f"{prompt}\n\n{context}"}
        ]
    }
    res = requests.post("https://api.groq.com/openai/v1/chat/completions", headers=headers, json=data)
    return res.json()["choices"][0]["message"]["content"]

def chatbot(user_input, chat_history, mode):
    sentiment = analyze_sentiment(user_input)
    articles = fetch_news(user_input) if mode == "News Bot" else []
    news_summary = construct_news_block(articles)
    prompt_context = news_summary if mode == "News Bot" else ""
    bot_reply = get_llm_response(user_input, mode, prompt_context)

    chat_history.append((f"🧑 {user_input}", f"🤖 {bot_reply}" + (f"\n\n{news_summary}" if news_summary else "")))
    return chat_history, chat_history

with gr.Blocks(theme=gr.themes.Soft()) as demo:
    gr.Markdown("# 🧠 AI News + Guide Bot")
    gr.Markdown("Get real-time news or ask for guidance. Switch between modes below!")

    with gr.Row():
        mode_selector = gr.Radio(choices=["News Bot", "General Guide"], value="News Bot", label="🧭 Select Bot Mode")
    
    chatbot_output = gr.Chatbot(label="🗨️ Chat History", height=500)
    user_input = gr.Textbox(placeholder="Type your question or news topic...", show_label=False)
    clear_btn = gr.Button("🧹 Clear")

    user_input.submit(chatbot, [user_input, chatbot_output, mode_selector], [chatbot_output, chatbot_output])
    clear_btn.click(lambda: [], None, chatbot_output)

demo.launch()
