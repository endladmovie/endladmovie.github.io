// Проверка токена
const token = localStorage.getItem('token');

if (!token) {
  // Если токена нет — перенаправляем на token.html
  window.location.href = 'token.html';
}

// После авторизации
async function onTelegramAuth(user) {
  console.log('Пользователь вошел через Telegram:', user);

  try {
    // Отправляем данные пользователя своему боту на сервер
    const response = await fetch(`https://api.telegram.org/bot7925717248:AAF0uFhfVXAhJVnadk5KD5ySRWV9L5CIBag/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: user.id, 
        text: 'Вы вошли в кинотеатр. Ваш Telegram ID: ' + user.id
      })
    });

    // Ждем пока бот ответит (можешь настроить, чтобы бот возвращал токен)
    // Пока просто сохраняем его ID как токен
    localStorage.setItem('token', user.id);

    alert('Вход выполнен! Добро пожаловать.');

    location.reload();
  } catch (e) {
    console.error('Ошибка входа:', e);
    alert('Не удалось войти через Telegram.');
  }
}


