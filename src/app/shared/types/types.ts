export interface CurrentWeather {
  temp_f: number;
  feelslike_f: number;
  uv: number;
  humidity: number;
  wind_mph: number;
  wind_dir: string;
  wind_degree: number;
  gust_mph: number;
  vis_miles: number;
  dewpoint_f: number;
  condition: {
    text: string;
  };
}

export interface Location {
  country: string;
  lat: number;
  lon: number;
  localtime: string;
  name: string;
  region: string;
}

export interface ForecastDay {
  date: string;
  day: {
    maxtemp_f: number;
    mintemp_f: number;
    condition: {
      code: number;
      text: string;
    };
  };
  hour: HourlyForecast[];
}

export interface WeatherData {
  current: CurrentWeather;
  location: Location;
  forecast: {
    forecastday: ForecastDay[];
  };
}

export interface City {
  id: number;
  name: string;
  region: string;
  country: string;
}

export interface HourlyForecast {
  time: string;
  temp_f: number;
  condition: {
    text: string;
  };
  is_day: boolean;
}

export interface DailyForecast {
  date: string;
  day: {
    condition: {
      text: string;
    };
    mintemp_f: number;
    maxtemp_f: number;
  };
}

export interface Wind {
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;
  gust_mph: number;
}
