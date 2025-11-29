# Быстрый старт на Windows

## Запуск на Windows 10/11

### Шаг 1: Установка Docker Desktop

1. **Скачайте Docker Desktop для Windows:**
   - Перейдите на https://www.docker.com/products/docker-desktop/
   - Нажмите "Download for Windows"
   - Скачайте установщик `Docker Desktop Installer.exe`

2. **Установите Docker Desktop:**
   - Запустите скачанный установщик
   - Следуйте инструкциям установщика
   - **Важно:** Убедитесь, что включена опция "Use WSL 2 instead of Hyper-V" (если доступна)
   - После установки перезагрузите компьютер (если потребуется)

3. **Запустите Docker Desktop:**
   - Найдите Docker Desktop в меню Пуск и запустите
   - Дождитесь полной загрузки (иконка Docker в системном трее перестанет мигать)
   - При первом запуске может потребоваться принять лицензионное соглашение

4. **Проверьте установку:**
   - Откройте PowerShell или Command Prompt
   - Выполните команды:
   ```powershell
   docker --version
   docker compose version
   ```
   - Должны отобразиться версии Docker

### Шаг 2: Подготовка проекта

1. **Откройте PowerShell или Command Prompt**

2. **Перейдите в директорию проекта:**
   ```powershell
   cd "C:\Users\VladB\OneDrive\Рабочий стол\Hackthon"
   ```
   
   Или если проект в другом месте, укажите правильный путь.

3. **Убедитесь, что вы в корневой директории проекта:**
   - Должны быть видны папки `backend`, `frontend` и файл `docker-compose.yml`

### Шаг 3: Запуск приложения

В PowerShell или Command Prompt выполните:

```powershell
docker compose up --build
```

**Что происходит:**
- Docker скачает необходимые образы (PostgreSQL, Node.js, Java)
- Соберет backend приложение (Maven)
- Соберет frontend приложение (npm)
- Запустит все сервисы

**Первая сборка займет 5-15 минут** (зависит от скорости интернета).

Вы увидите логи всех сервисов в терминале. Дождитесь сообщений о том, что все сервисы запущены.

### Шаг 4: Доступ к приложению

После успешного запуска откройте браузер и перейдите:

- **Frontend (веб-интерфейс):** http://localhost
- **Backend API:** http://localhost:8080/api
- **Swagger документация:** http://localhost:8080/swagger-ui.html

**Данные для входа:**
- Email: `student@example.com`
- Пароль: `password123`

### Шаг 5: Остановка приложения

Нажмите `Ctrl+C` в терминале, где запущено приложение.

Или в другом терминале выполните:
```powershell
docker compose down
```

## Решение проблем

### Проблема: "Docker daemon is not running"

**Решение:**
- Убедитесь, что Docker Desktop запущен (иконка в системном трее)
- Если иконки нет, запустите Docker Desktop из меню Пуск
- Дождитесь полной загрузки Docker Desktop

### Проблема: "Port 80 is already in use"

**Решение:** Порт 80 может быть занят другими приложениями (например, IIS или Skype).

**Вариант 1:** Остановите службу, занимающую порт 80:
```powershell
# От имени администратора
net stop w3svc
```

**Вариант 2:** Измените порт в `docker-compose.yml`:
1. Откройте файл `docker-compose.yml` в текстовом редакторе
2. Найдите секцию `frontend` → `ports`
3. Измените `"80:80"` на `"3000:80"`
4. Сохраните файл
5. Перезапустите: `docker compose up --build`

Тогда frontend будет доступен по адресу http://localhost:3000

### Проблема: "WSL 2 installation is incomplete"

**Решение:**
1. Установите WSL 2:
   ```powershell
   # От имени администратора в PowerShell
   wsl --install
   ```
2. Перезагрузите компьютер
3. Запустите Docker Desktop снова

### Проблема: Ошибки при сборке backend (Maven)

**Решение:**
- Убедитесь, что у вас достаточно места на диске (минимум 2GB)
- Проверьте, что Docker Desktop использует достаточно памяти:
  - Откройте Docker Desktop
  - Settings → Resources → Advanced
  - Установите минимум 2GB RAM для Docker

### Проблема: Медленная сборка

**Решение:**
- Увеличьте ресурсы Docker Desktop:
  - Settings → Resources → Advanced
  - Установите больше CPU и RAM
- Используйте SSD диск для лучшей производительности

### Проблема: "Cannot connect to Docker daemon"

**Решение:**
1. Перезапустите Docker Desktop
2. Если не помогло, перезагрузите компьютер
3. Проверьте, что виртуализация включена в BIOS

## Запуск в фоновом режиме

Чтобы запустить приложение в фоне (терминал не будет заблокирован):

```powershell
docker compose up -d --build
```

Просмотр логов:
```powershell
docker compose logs -f
```

Остановка:
```powershell
docker compose down
```

## Проверка статуса

Проверить, что все контейнеры запущены:
```powershell
docker compose ps
```

Должны быть запущены 3 контейнера:
- `student-platform-db` (PostgreSQL)
- `student-platform-backend` (Spring Boot)
- `student-platform-frontend` (Nginx)

## Полезные команды

```powershell
# Просмотр логов конкретного сервиса
docker compose logs backend
docker compose logs frontend
docker compose logs postgres

# Перезапуск конкретного сервиса
docker compose restart backend

# Остановка и удаление всех контейнеров
docker compose down

# Остановка и удаление всего (включая образы и данные)
docker compose down --rmi all -v

# Очистка неиспользуемых Docker ресурсов
docker system prune -a
```

## Минимальные требования

- Windows 10 (версия 2004 или новее) или Windows 11
- 64-битная система
- 4GB RAM (рекомендуется 8GB)
- 10GB свободного места на диске
- WSL 2 (устанавливается автоматически с Docker Desktop)
- Виртуализация включена в BIOS

## Альтернатива: WSL 2 напрямую

Если Docker Desktop работает плохо, можно использовать WSL 2 напрямую:

1. Установите WSL 2 и Ubuntu:
   ```powershell
   # От имени администратора
   wsl --install -d Ubuntu
   ```

2. В Ubuntu выполните команды из гайда `QUICKSTART_RU.md`

3. Доступ к приложению будет через `http://localhost` (WSL автоматически пробрасывает порты)

## Дополнительная информация

- Полная документация: `README.md`
- Гайд для Ubuntu: `QUICKSTART_RU.md`

Если возникли проблемы, проверьте логи:
```powershell
docker compose logs
```

## Быстрая справка

```powershell
# Запуск
docker compose up --build

# Остановка
docker compose down

# Просмотр логов
docker compose logs -f

# Статус контейнеров
docker compose ps
```


