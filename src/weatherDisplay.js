import dateMaker from "./dateMaker"
import weathericon from "./weatherIcon"
import rainCheck from "./raincheck"

const weatherDisplay = (weather) => {


	return ( 
			<div className='currentweather'>
                        <div className='currentgrid topleft'>
                            <div className='city'>{weather.name}</div>
                            <div className="sky">{weather.weather[0].description}</div>
                        </div>
                        <div className="currentgrid topright">
                            <div className="icon"><img id='wicon' src={weathericon(weather.weather[0].icon)} alt="icon"></img></div>
                            <div className="temperature">{Math.round(weather.main.temp)} °C</div>
                        </div>
                        <div className="currentgrid botleft">                            
                            <div className="date">{dateMaker().slice(0,2)}</div>
                            <div className="time">{dateMaker().slice(2,3)}</div>
                        </div>
                        <div className="currentgrid botright">
                            <div className="wind">Wind: {weather.wind.speed} m/s</div>
                            <div className="humidity">Humidity: {weather.main.humidity} %</div>
                            <div className="precipitation">Precipitation (1h): {rainCheck(weather, 1)}</div>
                        </div>
            </div>
)}

export default weatherDisplay