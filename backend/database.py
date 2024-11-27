import sqlite3

def init_db():
    conn = sqlite3.connect('chatbot.db')
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS customization (
            bot_id TEXT PRIMARY KEY,
            customization TEXT
        )
    ''')
    conn.commit()
    conn.close()

import json  # Добавьте импорт для работы с JSON

def save_customization(bot_id, customization):
    conn = sqlite3.connect('chatbots.db')
    cursor = conn.cursor()
    
    # Преобразуем словарь в строку JSON
    customization_json = json.dumps(customization)
    
    cursor.execute('''
        INSERT OR REPLACE INTO bots (id, customization) 
        VALUES (?, ?)
    ''', (bot_id, customization_json))
    
    conn.commit()
    conn.close()

def get_customization(bot_id):
    conn = sqlite3.connect('chatbots.db')
    cursor = conn.cursor()
    
    cursor.execute('SELECT customization FROM bots WHERE id = ?', (bot_id,))
    row = cursor.fetchone()
    
    conn.close()
    
    if row:
        # Преобразуем JSON-строку обратно в словарь
        return json.loads(row[0])
    return None




init_db()
