import dateMaker from "./dateMaker"
import WeatherIcon from "./WeatherIcon"
import rainCheck from "./raincheck"

const ForecastDisplay = ({forecast, displaying}) => {
    const hours = [3, 6, 9, 12, 15]


    let forecasts = hours.map(i => // sets up an array called forecasts, uses the index of the array passed in that matches the value of the selection
                <div className="plus mobile" id={i} key={i}>  
                    <div className="tophalf" id="future">
                        <div className="time">{(dateMaker()[3] + i)%24}:00</div> 
                        <WeatherIcon icon={forecast[displaying].list[i/3].weather[0].icon} iconclass="ficon" />
                        <div className="temperature">{Math.round(forecast[displaying].list[i/3].main.temp)}</div>
                    </div>
                    <div className="bothalf" id="future">
                        <div className="wind">{forecast[displaying].list[i/3].wind.speed} m/s</div>
                        <div className="humidity">{forecast[displaying].list[i/3].main.humidity} %</div>
                        <div className="precipitation">{rainCheck(forecast[displaying].list[i/3], 3)}</div>
                    </div>
                </div>)
    
        return (
            
            <div className='forecast'>
                <div className="forecast-box">
                    {forecasts}
                </div>
            </div>

            
            )
    }
export default ForecastDisplay

