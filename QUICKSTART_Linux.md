# Быстрый старт - Гайд на русском

## Запуск на Ubuntu (виртуальная машина)

### Шаг 1: Установка Docker и Docker Compose

Откройте терминал в Ubuntu и выполните следующие команды:

```bash
# Обновляем список пакетов
sudo apt update

# Устанавливаем необходимые зависимости
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Добавляем официальный GPG ключ Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Добавляем репозиторий Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Устанавливаем Docker
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin

# Добавляем текущего пользователя в группу docker (чтобы не использовать sudo)
sudo usermod -aG docker $USER

# Проверяем установку
docker --version
docker compose version
```

**Важно:** После добавления пользователя в группу docker, нужно выйти и зайти обратно в систему (или перезагрузить виртуальную машину), чтобы изменения вступили в силу.

### Шаг 2: Подготовка проекта

1. **Скопируйте проект на виртуальную машину Ubuntu**

   Есть несколько способов:
   
   **Вариант А:** Если проект в Git репозитории:
   ```bash
   git clone <ваш-репозиторий>
   cd Hackthon
   ```
   
   **Вариант Б:** Если проект на Windows, используйте общую папку или скопируйте через SCP:
   ```bash
   # На Windows в PowerShell или CMD
   scp -r C:\Users\VladB\OneDrive\Рабочий\стол\Hackthon user@ubuntu-ip:/home/user/
   ```
   
   **Вариант В:** Используйте общую папку VirtualBox/VMware или просто скопируйте файлы вручную

2. **Перейдите в директорию проекта:**
   ```bash
   cd Hackthon
   ```

### Шаг 3: Запуск приложения

```bash
# Запускаем все сервисы (база данных, backend, frontend)
docker compose up --build
```

Эта команда:
- Соберет Docker образы для backend и frontend
- Запустит PostgreSQL базу данных
- Инициализирует базу данных с тестовыми данными
- Запустит backend на порту 8080
- Запустит frontend на порту 80

**Первая сборка может занять 5-10 минут** (скачивание образов, установка зависимостей).

### Шаг 4: Доступ к приложению

После успешного запуска вы увидите в терминале сообщения о том, что все сервисы запущены.

**Откройте браузер и перейдите по адресу:**
- **Frontend (веб-интерфейс):** http://localhost
- **Backend API:** http://localhost:8080/api
- **Swagger документация:** http://localhost:8080/swagger-ui.html

**Данные для входа:**
- Email: `student@example.com`
- Пароль: `password123`

### Шаг 5: Остановка приложения

Чтобы остановить все сервисы, нажмите `Ctrl+C` в терминале, или выполните:

```bash
docker compose down
```

Чтобы также удалить все данные (база данных и загруженные файлы):

```bash
docker compose down -v
```

## Решение проблем

### Проблема: "Permission denied" при запуске Docker

**Решение:**
```bash
# Выйдите и войдите обратно в систему после добавления в группу docker
# Или выполните:
newgrp docker
```

### Проблема: Порт 80 уже занят

**Решение:** Измените порт в `docker-compose.yml`:
```yaml
frontend:
  ports:
    - "3000:80"  # Вместо "80:80"
```
Тогда frontend будет доступен по адресу http://localhost:3000

### Проблема: Backend не может подключиться к базе данных

**Решение:** Убедитесь, что PostgreSQL контейнер запущен:
```bash
docker compose ps
```

Если контейнер `postgres` не запущен, проверьте логи:
```bash
docker compose logs postgres
```

### Проблема: Ошибки при сборке

**Решение:** Убедитесь, что у вас достаточно места на диске (минимум 2GB свободного места):
```bash
df -h
```

Очистите старые Docker образы:
```bash
docker system prune -a
```

### Проблема: Не могу открыть http://localhost в браузере на хосте

Если вы используете виртуальную машину, `localhost` будет указывать на хост-машину (Windows), а не на Ubuntu.

**Решение:**
1. Узнайте IP адрес виртуальной машины Ubuntu:
   ```bash
   ip addr show
   # Или
   hostname -I
   ```

2. Откройте в браузере на Windows: `http://<IP-адрес-ubuntu>`

3. Или настройте проброс портов в настройках виртуальной машины (VirtualBox/VMware)

## Запуск в фоновом режиме

Чтобы запустить приложение в фоне (без блокировки терминала):

```bash
docker compose up -d --build
```

Просмотр логов:
```bash
docker compose logs -f
```

Остановка:
```bash
docker compose down
```

## Проверка статуса

Проверить, что все контейнеры запущены:
```bash
docker compose ps
```

Должны быть запущены 3 контейнера:
- `student-platform-db` (PostgreSQL)
- `student-platform-backend` (Spring Boot)
- `student-platform-frontend` (Nginx)

## Полезные команды

```bash
# Просмотр логов конкретного сервиса
docker compose logs backend
docker compose logs frontend
docker compose logs postgres

# Перезапуск конкретного сервиса
docker compose restart backend

# Остановка и удаление всех контейнеров и образов
docker compose down --rmi all -v
```

## Минимальные требования

- Ubuntu 20.04 или новее
- 2GB RAM (рекомендуется 4GB)
- 5GB свободного места на диске
- Интернет-соединение для первой установки

## Дополнительная информация

Полная документация на английском языке находится в файле `README.md`.

Если возникли проблемы, проверьте логи:
```bash
docker compose logs
```


