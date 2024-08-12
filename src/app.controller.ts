import { Controller, Get } from '@nestjs/common';
import { WeatherService } from './weather/weather.service';

@Controller()
export class AppController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async sendWeatherReport() {
    await this.weatherService.sendWeatherReport();
  }
}
