declare namespace NodeJS {
  interface ProcessEnv {
    // API
    NODE_ENV: 'local' | 'development' | 'staging' | 'production' | 'ci';
    PROTOCOL: string;
    HOST: string;
    PORT: string;
    LOGGING_LEVEL: 'error' | 'warn' | 'verbose' | 'info' | 'debug';
    CORS_WHITE_LIST: string;
    FRONTEND_URL: string;

    // Postgres Database envs
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    POSTRGRES_HOSTNAME: string;
  }
}
