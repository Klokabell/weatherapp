import dateMaker from "./dateMaker"
import weathericon from "./weatherIcon"
import rainCheck from "./raincheck"

const weatherDisplay = (weather) => {


	return ( 
			<div className='current-weather-box'>
                <div className="tophalf" id="current">
                    <div className='current-weather-item topleft'>
                        <div className='city mobile'>{weather.name}</div>
                        <div className="sky mobile">{weather.weather[0].description}</div>
                    </div>
                    <div className="current-weather-item topright">
                        <div className="icon"><img id='wicon' src={weathericon(weather.weather[0].icon)} alt="icon"></img></div>
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
)}

export default weatherDisplay