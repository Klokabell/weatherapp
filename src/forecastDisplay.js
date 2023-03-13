import dateMaker from "./dateMaker"
import weathericon from "./weatherIcon"


const forecastDisplay = (i) => {
    <div className="plus" id='i'>
        <div className="tophalf">
            <div className="time">{(dateMaker()[3] + 3)%24}:00</div>
            <div className="icon"><img id='ficon' src={weathericon(forecast.list[1].weather[0].icon)} alt="icon"></img></div>
            <div className="temperature">{Math.round(forecast.list[1].main.temp)} °C</div>
        </div>
        <div className="bothalf">
                <div className="wind">{forecast.list[1].wind.speed} m/s</div>
                <div className="humidity">{forecast.list[1].main.humidity} %</div>
                <div className="precipitation">mm</div>
        </div>
    </div>
}