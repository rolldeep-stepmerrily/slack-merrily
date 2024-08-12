import { Module } from '@nestjs/common';

import { SlackModule } from 'src/slack/slack.module';
import { WeatherService } from './weather.service';

@Module({
  imports: [SlackModule],
  providers: [WeatherService],
  exports: [WeatherService],
})
export class WeatherModule {}
