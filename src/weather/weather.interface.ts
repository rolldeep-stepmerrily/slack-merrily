interface ICoord {
  lon: number;
  lat: number;
}

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

interface IWind {
  speed: number;
  deg: number;
  gust: number;
}

interface IClouds {
  all: number;
}

interface IRain {
  '1h': number;
  '3h': number;
}

interface ISnow {
  '1h': number;
  '3h': number;
}

interface ISys {
  type: number;
  id: number;
  message?: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeatherReport {
  coord: ICoord;
  weather: IWeather[];
  base: string;
  main: IMain;
  visibility: number;
  wind: IWind;
  clouds: IClouds;
  dt: number;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
  rain?: IRain;
  snow?: ISnow;
}
