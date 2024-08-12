import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WebClient } from '@slack/web-api';
import axios from 'axios';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Seoul');

export default dayjs;

import { IMessage } from 'src/slack/slack.interface';
import { IWeatherReport } from './weather.interface';

const openWeatherUrl = 'https://api.openweathermap.org/data/2.5/weather';

@Injectable()
export class WeatherService {
  constructor(private readonly slackClient: WebClient) {}

  async getWeatherReport() {
    try {
      const response = await axios.get(openWeatherUrl, {
        params: { q: 'Seoul,kr', appid: process.env.OPEN_WEATHER_API_KEY, units: 'metric' },
      });

      return response.data;
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  async sendSlackMessage(report: IWeatherReport) {
    try {
      const message: IMessage = {
        channel: process.env.SLACK_CHANNEL,
        text: '오늘의 날씨',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: `오늘의 날씨 정보(서울)\n 온도 : ${report.main.temp}℃\n 습도 : ${report.main.humidity}%\n 날씨 : ${report.weather[0].description}`,
            },
          },
          {
            type: 'context',
            elements: [{ type: 'mrkdwn', text: `마지막 업데이트 : ${dayjs().format('YYYY-MM-DD HH:mm:ss')}` }],
          },
        ],
      };

      await this.slackClient.chat.postMessage(message);
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }

  @Cron('0 0 7 * * *')
  async sendWeatherReport() {
    try {
      const report = await this.getWeatherReport();
      await this.sendSlackMessage(report);
    } catch (e) {
      console.error(e);

      throw new InternalServerErrorException();
    }
  }
}
