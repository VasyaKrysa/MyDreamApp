import { ChartsData } from './chartsData.interface';

export interface WeahterForecast {
    temperatureArr: ChartsData[];
      pressureArr: ChartsData[];
      humidityArr: ChartsData[];
      windSpeedArr: ChartsData[];
}
