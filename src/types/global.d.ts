declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_BOT_TOKEN?: string;
      TELEGRAM_CHAT_ID?: string;
      NEXT_PUBLIC_SITE_URL?: string;
      NODE_ENV: "development" | "production" | "test";
    }
  }
}

export {};
