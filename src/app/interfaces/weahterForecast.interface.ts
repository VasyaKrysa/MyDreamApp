export interface WeahterForecast {
    temperatureArr: {
        'name': string,
        'series': {
          'name': string,
          'value': number
        }[]
      } [];
      pressureArr: {
        'name': string,
        'series': {
          'name': string,
          'value': number
        }[]
      } [];
      humidityArr: {
        'name': string,
        'series': {
          'name': string,
          'value': number
        }[]
      } [];
      windSpeedArr: {
        'name': string,
        'series': {
          'name': string,
          'value': number
        }[]
      } [];
}
