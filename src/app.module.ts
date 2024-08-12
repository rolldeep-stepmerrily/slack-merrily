import { Module } from '@nestjs/common';
import Joi from 'joi';

import { SlackModule } from './slack/slack.module';
import { WeatherModule } from './weather/weather.module';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    SlackModule,
    WeatherModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SLACK_BOT_TOKEN: Joi.string().required(),
        SLACK_CHANNEL: Joi.string().required(),
        OPEN_WEATHER_API_KEY: Joi.string().required(),
      }),
      validationOptions: { abortEarly: true },
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
