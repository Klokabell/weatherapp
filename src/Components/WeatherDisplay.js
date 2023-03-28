import dateMaker from "./dateMaker"
import Weathericon from "./WeatherIcon"
import rainCheck from "./raincheck"

const WeatherDisplay = ({weather}) => {


	return (
        <div className='current-weather mobile'>
            <div className='current-weather-box'>
                <div className="tophalf" id="current">
                    <div className='current-weather-item topleft'>
                        <div className='city mobile'>{weather.name}</div>
                        <div className="sky mobile">{weather.weather[0].description}</div>
                    </div>
                    <div className="current-weather-item topright">
                        <Weathericon icon={weather.weather[0].icon} iconclass="wicon"/>
                        <span className="temperature">{Math.round(weather.main.temp)}</span>
                    </div>
                </div>
                <div className="bothalf" id="current">
                    <div className="current-weather-item botleft">                            
                        <div className="date">{dateMaker().slice(0,2)}</div>
                        <div className="time">{dateMaker().slice(2,3)}</div>
                    </div>
                    <div className="current-weather-item botright">
                        <div className="wind">Wind: {weather.wind.speed} m/s</div>
                        <div className="humidity">Humidity: {weather.main.humidity} %</div>
                        <div className="precipitation">Precipitation (1h): {rainCheck(weather, 1)}</div>
                    </div>
                </div>
            </div>
        </div>
)}

export default WeatherDisplay