declare namespace NodeJS {
  interface ProcessEnv {
    GOOGLE_KEY: string;
    DATABASE_URL: string;
    REDIS_URL: string;
    PORT: string;
    SESSION_SECRET: string;
    CORS_ORIGIN: string;
  }
}