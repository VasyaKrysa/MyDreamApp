import { IWeather } from '../interfaces/weather.interface';


export class WeatherDataService {
    private receivedWeather: IWeather = {
        name: '',
        id: 0,
        lat: 0,
        lon: 0,
        temperature: 0,
        weather: '',
        icon: '',
        pressure: 0,
        humidity: 0
    };
    private errorMessage = {code: 0, status: 'NoStatus' };

    isInfoVisible = false;
    isNotFound = false;

    setReceivedWeather(response: any) {
        console.log(response);
        this.receivedWeather.name = response.rootElement.name;
        this.receivedWeather.lat = response.rootElement.coord.lat;
        this.receivedWeather.lon = response.rootElement.coord.lon;
        this.receivedWeather.temperature = Math.round(response.rootElement.main.temp - 273);
        this.receivedWeather.weather = response.rootElement.weather[0].main;
        this.receivedWeather.id = response.rootElement.id;
        this.receivedWeather.icon = 'http://openweathermap.org/img/wn/' + (response.rootElement.weather[0].icon) + '@2x.png';
        this.receivedWeather.pressure = response.rootElement.main.pressure * 0.75;
        this.receivedWeather.humidity = response.rootElement.main.humidity;
        this.isInfoVisible = true;
        this.isNotFound = false;
    }

    getReceivedWeather(): IWeather {
        return this.receivedWeather;
    }

    getErrorMessage() {
        return this.errorMessage;
    }
    setErrorMessage(code: number, status: string) {
        this.errorMessage.code = code;
        this.errorMessage.status = status;
        this.isInfoVisible = false;
        this.isNotFound = true;
    }
}
