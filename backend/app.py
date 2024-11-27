from flask import Flask, render_template, request, jsonify
from database import save_customization, get_customization

app = Flask(__name__)

@app.route('/')
def customization_page():
    return render_template('customization.html')

@app.route('/save-customization', methods=['POST'])
def save_customization_endpoint():
    data = request.json
    save_customization(data['bot_id'], data['customization'])
    return jsonify({"status": "success"})

@app.route('/get-customization/<bot_id>', methods=['GET'])
def get_customization_endpoint(bot_id):
    customization = get_customization(bot_id)
    return jsonify(customization)

@app.route('/get_bot/<int:bot_id>', methods=['GET'])
def get_bot(bot_id):
    conn = sqlite3.connect('chatbots.db')
    cursor = conn.cursor()

    # Получаем параметры бота из базы данных
    cursor.execute("SELECT background_color, text_color, font_family FROM bots WHERE id=?", (bot_id,))
    bot = cursor.fetchone()

    # Если бот не найден, возвращаем ошибку
    if not bot:
        return jsonify({'error': 'Bot not found'}), 404

    # Извлекаем данные из базы
    background_color, text_color, font_family = bot

    # Генерация HTML с встраиванием JavaScript
    html_template = f"""
    <div id="chat-bot" style="font-family: {font_family};">
        <div id="chat-container" style="background-color: {background_color}; color: {text_color};">
            <div id="chat-header">Чат-бот</div>
            <div id="chat-box" style="height: 300px; overflow-y: auto;"></div>
            <div id="chat-footer">
                <textarea id="user-input" placeholder="Введите сообщение..."></textarea>
                <button id="send-btn" style="background-color: {text_color}; color: {background_color};">Отправить</button>
            </div>
        </div>
    </div>

    <script>
        document.getElementById('send-btn').addEventListener('click', function() {{
            const message = document.getElementById('user-input').value;
            const chatBox = document.getElementById('chat-box');
            
            if (message.trim()) {{
                chatBox.innerHTML += `<div style="text-align: right; margin: 5px 0;">${{message}}</div>`;
                document.getElementById('user-input').value = '';

                fetch('http://127.0.0.1:5000/chat', {{
                    method: 'POST',
                    headers: {{ 'Content-Type': 'application/json' }},
                    body: JSON.stringify({{ 'message': message, 'bot_id': {bot_id} }})
                }})
                .then(function(response) {{
                    return response.json();
                }})
                .then(function(data) {{
                    chatBox.innerHTML += `<div style="text-align: left; margin: 5px 0;">${{data.reply}}</div>`;
                    chatBox.scrollTop = chatBox.scrollHeight;
                }})
                .catch(function(error) {{
                    console.error('Ошибка:', error);
                }});
            }}
        }});
    </script>
    """
    conn.close()
    return html_template


@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    bot_id = data.get('bot_id')
    message = data.get('message')

    # Замените на вызов вашей модели
    response = f"Ответ на: {message}"

    return jsonify({'reply': response})

if __name__ == '__main__':
    app.run(debug=True)
