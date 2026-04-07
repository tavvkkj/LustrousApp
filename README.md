# 🌟 Luminous App

A professional, high-performance, and fully internationalized Discord bot built with **TypeScript** and **Discord.js v14**. Developed by the **Luminous Team**, this project focuses on modularity, type safety, and a seamless multi-language experience.

---

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Discord.js](https://img.shields.io/badge/discord.js-%235865F2.svg?style=for-the-badge&logo=discord&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)

## 🚀 Key Features

* **Dynamic i18n Engine**: Native support for English (`en-US`), Portuguese (`pt-BR`), Russian (`ru`), and Spanish (`es-ES`).
* **Smart Locale Detection**: Automatically detects and applies the server's configured language for all interactions.
* **Environment Safety**: Uses **Zod** to strictly validate environment variables on startup, preventing runtime failures.
* **Modular Registry**: Automatically scans and registers commands and events, keeping the codebase clean and scalable.
* **Dynamic Presence**: A rotating activity system that keeps the bot's status fresh and informative.
* **Lifecycle Management**: Implements graceful shutdown procedures to handle process signals (`SIGINT`, `SIGTERM`) safely.

## 🛠 Tech Stack

* **Core**: [Discord.js v14](https://discord.js.org/)
* **Validation**: [Zod](https://zod.dev/)
* **Runtime**: [Node.js](https://nodejs.org/) with `ts-node-dev` for development
* **Formatting**: ESLint & Prettier for consistent code style

## 📂 Project Structure

* **`src/bot`**: Client initialization and command/event registration logic.
* **`src/commands`**: Directory for all Slash Command implementations.
* **`src/config`**: Configuration files, including environment variables, constants, and emojis.
* **`src/events`**: Handlers for Discord gateway events.
* **`src/locales`**: JSON files containing all localized strings for supported languages.
* **`src/services`**: Core business logic, including the localization engine and database interfaces.
* **`src/types`**: Global TypeScript definitions and interfaces.

## ⚙️ Setup & Installation

### 1. Prerequisites
* Node.js (v18.0.0 or higher)
* npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Configuration
Create a `.env` file in the root directory and fill in your credentials:

```env
DISCORD_TOKEN=your_bot_token
DISCORD_CLIENT_ID=your_application_id
DISCORD_GUILD_ID=your_test_guild_id
NODE_ENV=development
DEFAULT_LOCALE=en-US
```

### 4. Available Scripts

```bash
npm run dev      # Start the bot in development mode with auto-reload
npm run build    # Compile the TypeScript code to JavaScript
npm start        # Run the compiled bot from the dist folder
npm run lint     # Run ESLint to check for code issues
```

---

Developed with ❤️ by **Luminous Team**
