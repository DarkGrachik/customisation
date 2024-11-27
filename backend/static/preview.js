document.addEventListener('DOMContentLoaded', () => {
    const chatBackgroundInput = document.getElementById('chat-background');
    const userMessageBgInput = document.getElementById('user-message-bg');
    const botMessageBgInput = document.getElementById('bot-message-bg');
    const headerBackgroundInput = document.getElementById('header-background');
    // const messageFontInput = document.getElementById('message-font');
    const botNameInput = document.getElementById('bot-name-input');
    const avatarInput = document.getElementById('upload-avatar');
    const footerBackgroundInput = document.getElementById('footer-background');
    const buttonColorInput = document.getElementById('button-color');
    const generateScriptButton = document.getElementById('generate-script-button');
    const copyCodeButton = document.getElementById('copy-code-button');
    const chatbox = document.getElementById('chatbox');
    const chatAvatar = document.getElementById('chat-avatar');
    const botName = document.getElementById('bot-name');
    const sendButton = document.getElementById('send_button');
    const userMessageInput = document.getElementById('user_message');
    const userMessageTextColorInput = document.getElementById('user-message-text-color'); // Цвет текста сообщений пользователя
    const botMessageTextColorInput = document.getElementById('bot-message-text-color'); // Цвет текста сообщений бота
    const headerTextColorInput = document.getElementById('header-text-color'); // Цвет текста заголовка
    const buttonTextColorInput = document.getElementById('button-text-color'); // Цвет текста кнопок

    // Функция для добавления сообщений в чат
    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', type);

        // Применяем выбранный цвет фона для сообщения
        if (type === 'user-message') {
            messageDiv.style.backgroundColor = userMessageBgInput.value;
            messageDiv.style.color = userMessageTextColorInput.value;
            messageDiv.style.setProperty('--user-message-color', userMessageBgInput.value);
        } else if (type === 'bot-message') {
            messageDiv.style.backgroundColor = botMessageBgInput.value;
            messageDiv.style.color = botMessageTextColorInput.value; 
            messageDiv.style.setProperty('--bot-message-color', botMessageBgInput.value);
        }

        // Применяем шрифт к новому сообщению
        // messageDiv.style.fontFamily = messageFontInput.value;

        messageDiv.innerHTML = text;
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight; // Прокрутка чата вниз
    }

    // Добавление тестовых сообщений
    addMessage('Привет! Как я могу помочь?', 'bot-message');
    addMessage('Какая погода в Москве?', 'user-message');

    // Обработчик для отправки сообщений
    sendButton.addEventListener('click', () => {
        const userMessage = userMessageInput.value.trim();
        if (userMessage) {
            addMessage(userMessage, 'user-message');
            userMessageInput.value = ''; // Очистка поля ввода

            // Ответ от бота
            setTimeout(() => {
                addMessage('Я вас понял, спасибо за вопрос!', 'bot-message');
            }, 1000);
        }
    });

    // Применение стилей
    function applyStyles() {
        const selectedUserMessageTextColor = userMessageTextColorInput.value;  // Цвет текста сообщений пользователя
        const selectedBotMessageTextColor = botMessageTextColorInput.value;  // Цвет текста сообщений бота
        const selectedHeaderTextColor = headerTextColorInput.value;  // Цвет текста заголовка
        const selectedButtonTextColor = buttonTextColorInput.value;  // Цвет текста кнопок

        document.querySelectorAll('.user-message').forEach(function (message) {
            message.style.backgroundColor = userMessageBgInput.value;
            message.style.color = selectedUserMessageTextColor;
            // message.style.fontFamily = selectedFont;
            message.style.setProperty('--user-message-color', userMessageBgInput.value);
        });

        document.querySelectorAll('.bot-message').forEach(function (message) {
            message.style.backgroundColor = botMessageBgInput.value;
            message.style.color = selectedBotMessageTextColor; 
            message.style.setProperty('--bot-message-color', botMessageBgInput.value);
            // message.style.fontFamily = messageFontInput.value;
        });

        chatbox.style.backgroundColor = chatBackgroundInput.value;
        document.querySelector('.chat-header').style.backgroundColor = headerBackgroundInput.value;
        document.querySelector('.chat-footer').style.backgroundColor = footerBackgroundInput.value;
        sendButton.style.backgroundColor = buttonColorInput.value;
        chatAvatar.src = avatarInput.files.length > 0 ? URL.createObjectURL(avatarInput.files[0]) : 'https://via.placeholder.com/40';
        botName.textContent = botNameInput.value;

        chatbox.style.color = selectedUserMessageTextColor; // Цвет текста сообщений пользователя
        document.querySelector('.chat-header').style.color = selectedHeaderTextColor; // Цвет текста заголовка
        sendButton.style.color = selectedButtonTextColor; // Цвет текста кнопок

        // chatbox.style.fontFamily = messageFontInput.value;

        // Применение шрифта ко всем элементам, кроме сообщений
        // document.querySelector('.chat-header').style.fontFamily = messageFontInput.value;
        // sendButton.style.fontFamily = messageFontInput.value;
        // userMessageInput.style.fontFamily = messageFontInput.value;
    }

    // Обработчики событий
    chatBackgroundInput.addEventListener('input', applyStyles);
    userMessageBgInput.addEventListener('input', applyStyles);
    botMessageBgInput.addEventListener('input', applyStyles);
    headerBackgroundInput.addEventListener('input', applyStyles);
    // messageFontInput.addEventListener('change', applyStyles);
    botNameInput.addEventListener('input', applyStyles);
    avatarInput.addEventListener('change', applyStyles);
    footerBackgroundInput.addEventListener('input', applyStyles);
    buttonColorInput.addEventListener('input', applyStyles);
    userMessageTextColorInput.addEventListener('input', applyStyles);
    botMessageTextColorInput.addEventListener('input', applyStyles);
    headerTextColorInput.addEventListener('input', applyStyles);
    buttonTextColorInput.addEventListener('input', applyStyles);

    // Генерация кода для вставки
    generateScriptButton.addEventListener('click', () => {
        const scriptCode = ` 
            <div class="chat-container">
                <div class="chat-header" style="font-family: ${messageFontInput.value};">
                    <img src="${chatAvatar.src}" alt="avatar" class="chat-avatar">
                    <span>${botName.textContent}</span>
                </div>
                <div class="chat-box" style="background-color: ${chatBackgroundInput.value}; font-family: ${messageFontInput.value};">
                    <!-- Сообщения -->
                </div>
                <div class="chat-footer" style="background-color: ${footerBackgroundInput.value};">
                    <textarea placeholder="Введите ваш вопрос..." rows="2" style="font-family: ${messageFontInput.value};"></textarea>
                    <button style="font-family: ${messageFontInput.value};">Отправить</button>
                </div>
            </div>
        `;
        alert('Скопируйте этот код:\n' + scriptCode);
    });

    // Копирование кода
    copyCodeButton.addEventListener('click', () => {
        const code = ` 
            <div class="chat-container">
                <div class="chat-header" style="font-family: ${messageFontInput.value};">
                    <img src="${chatAvatar.src}" alt="avatar" class="chat-avatar">
                    <span>${botName.textContent}</span>
                </div>
                <div class="chat-box" style="background-color: ${chatBackgroundInput.value}; font-family: ${messageFontInput.value};">
                    <!-- Сообщения -->
                </div>
                <div class="chat-footer" style="background-color: ${footerBackgroundInput.value};">
                    <textarea placeholder="Введите ваш вопрос..." rows="2" style="font-family: ${messageFontInput.value};"></textarea>
                    <button style="font-family: ${messageFontInput.value};">Отправить</button>
                </div>
            </div>
        `;
        navigator.clipboard.writeText(code).then(() => {
            alert('Код успешно скопирован!');
        });
    });
});
