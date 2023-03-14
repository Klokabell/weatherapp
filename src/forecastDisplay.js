import dateMaker from "./dateMaker"
import weathericon from "./weatherIcon"
import rainCheck from "./raincheck"

const forecastDisplay = (forecast, spot) => {
    const hours = [3, 6, 9, 12, 15]

    
    
    let forecasts = hours.map(i => 
                <div className="plus" id={i} key={i}>
                    <div className="tophalf">
                        <div className="time">{(dateMaker()[3] + i)%24}:00</div>
                        <div className="icon"><img id='ficon' src={weathericon(forecast[spot].list[i/3].weather[0].icon)} alt="icon"></img></div>
                        <div className="temperature">{Math.round(forecast[spot].list[i/3].main.temp)} °C</div>
                    </div>
                    <div className="bothalf">
                            <div className="wind">{forecast[spot].list[i/3].wind.speed} m/s</div>
                            <div className="humidity">{forecast[spot].list[i/3].main.humidity} %</div>
                            <div className="precipitation">{rainCheck(forecast[spot].list[i/3], 3)}</div>
                    </div>
                </div>)
    
        return (forecasts)
    }
/*     [0].list[1].weather[0].icon
 */export default forecastDisplay

 //{rainCheck(forecast[spot].list[i/3])}