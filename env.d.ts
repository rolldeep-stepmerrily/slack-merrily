declare namespace NodeJS {
  interface ProcessEnv {
    SLACK_BOT_TOKEN: string;
    SLACK_CHANNEL: string;
    OPEN_WEATHER_API_KEY: string;
  }
}
