import './App.css';
import React, { useEffect, useState } from 'react';

const api = {
    key: "77c5e049fe0b5f2b238f8ee7a7c342c8",
    currenturl:"https://api.openweathermap.org/data/2.5/weather?lat=61.4991&lon=23.7871&limit=1&appid=",
    forecasturl:"https://api.openweathermap.org/data/2.5/forecast?lat=61.4991&lon=23.7871&appid="
}
const cities = [

    {
        name: "Tampere",
        lat: "61.4991",
        lon: "23.7871"
    },
    {
        name: "Jyväskylä",
        lat: "62.2415",
        lon: "25.7209"
    },
    {
        name: "Kupio",
        lat: "62.8924",
        lon: "27.677"
    },            
    {
        name: "Espoo",
        lat: "60.25",
        lon: "24.6667"
    },
]

function App() {

    const [weather, setWeather] = useState({})
    const [forecast, setForecast] = useState({})
    const [isLoading2, setIsLoading2] = useState(true)

    useEffect(() => {
        Promise.all([
            fetch(`${api.currenturl}${api.key}&units=metric`)
                .then(res=>res.json())
                .then(res=>setWeather(res)),
            fetch(`${api.forecasturl}${api.key}&units=metric`)
                .then(res=>res.json())
                .then(res=>{
                    setForecast(res)
                    setIsLoading2(false)
                })
        ])
    }, [])

    const rainCheck = (raining) =>{
        if(raining.rain){
            return raining.rain["1h"] +"mm"
        }
        else return "0 mm"
    }
    console.log(forecast)
    console.log(weather)

    const weathericon = (icon) => {
        let iconurl = "https://openweathermap.org/img/wn/"+icon+"@2x.png"
        return iconurl
    }

  
    const dateMaker = () => {

        let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
                      "September", "October", "November", "December"];
        
        let d = new Date()
        let day = d.getDate()
        let month = months[d.getMonth()] + " "
        let padMinutes = String(d.getMinutes()).padStart(2, '0')
        let hours = d.getHours() 
        let time = hours + ":" + padMinutes


        let date = [month, day, time, hours]
        return date
    }

    return(
        <div>
            <div className="banner"></div>
            <h1>Säätutka</h1>
            <main>
                <div className="gridContainer">
                    <div className="city-picker">
                            <select name="cities" id="cities">
                                <option value="Tampere" id='0'>Tampere</option>
                            </select>
                    </div>
                    <div className="citygrid">
                        {(typeof weather.main != "undefined") ? (
                            <div className='currentweather'>
                                <div className='grid-item topleft'>
                                    <div className='city'>{weather.name}</div>
                                    <div className="sky">{weather.weather[0].description}</div>
                                </div>
                                <div className="grid-item topright">
                                    <div className="icon"><img id='wicon' src={weathericon(weather.weather[0].icon)} alt="icon"></img></div>
                                    <div className="temperature">{Math.round(weather.main.temp)} °C</div>
                                </div>
                                <div className="grid-item botleft">                            
                                    <div className="date">{dateMaker().slice(0,2)}</div>
                                    <div className="time">{dateMaker().slice(2,3)}</div>
                                </div>
                                <div className="grid-item botright">
                                    <div className="wind">Wind: {weather.wind.speed} m/s</div>
                                    <div className="humidity">Humidity: {weather.main.humidity} %</div>
                                    <div className="precipitation">Precipitation (3h): {rainCheck(weather)}</div>
                                </div>
                            </div>
                            ) : ('')}
                            {isLoading2 ? (<div>Loading</div>) : 
                            (
                            <div className="forecast">
                                <div className="plus" id='3'>
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
                                <div className="plus" id='6'>
                                    <div className="tophalf">
                                        <div className="time">{(dateMaker()[3] + 6)%24}:00</div>
                                        <div className="icon">{<img id='ficon' src={weathericon(forecast.list[2].weather[0].icon)} alt="icon"></img>}</div>
                                        <div className="temperature">{Math.round(forecast.list[2].main.temp)} °C</div>
                                    </div>
                                    <div className="bothalf">
                                        <div className="wind">{forecast.list[2].wind.speed} m/s</div>
                                        <div className="humidity">{forecast.list[2].main.humidity} %</div>
                                        <div className="precipitation">mm</div>
                                    </div>
                                </div>
                                <div className="plus" id='9'>
                                    <div className="tophalf">
                                        <div className="time">{(dateMaker()[3] + 9)%24}:00</div>
                                        <div className="icon">{<img id='ficon' src={weathericon(forecast.list[3].weather[0].icon)} alt="icon"></img>}</div>
                                        <div className="temperature">{Math.round(forecast.list[3].main.temp)} °C</div>
                                    </div>
                                    <div className="bothalf">
                                        <div className="wind">{forecast.list[3].wind.speed} m/s</div>
                                        <div className="humidity">{forecast.list[3].main.humidity} %</div>
                                        <div className="precipitation">mm</div>
                                    </div>
                                </div>
                                <div className="plus" id='12'>
                                    <div className="tophalf">                            
                                        <div className="time">{(dateMaker()[3] + 12)%24}:00</div>
                                        <div className="icon">{<img id='ficon' src={weathericon(forecast.list[4].weather[0].icon)} alt="icon"></img>}</div>
                                        <div className="temperature">{Math.round(forecast.list[4].main.temp)} °C</div>
                                    </div>
                                    <div className="bothalf">
                                        <div className="wind">{forecast.list[4].wind.speed} m/s</div>
                                        <div className="humidity">{forecast.list[4].main.humidity} %</div>
                                        <div className="precipitation">mm</div>
                                    </div>
                                </div>
                                <div className="plus" id='15'>
                                    <div className="tophalf">
                                        <div className="time">{(dateMaker()[3] + 15)%24}:00</div>
                                        <div className="icon">{<img id='ficon' src={weathericon(forecast.list[5].weather[0].icon)} alt="icon"></img>}</div>
                                        <div className="temperature">{Math.round(forecast.list[5].main.temp)} °C</div>
                                    </div>
                                    <div className="bothalf">
                                        <div className="wind">{forecast.list[5].wind.speed} m/s</div>
                                        <div className="humidity">{forecast.list[5].main.humidity} %</div>
                                        <div className="precipitation">mm</div>
                                    </div>
                                </div>
                            </div> 
                        )}
                    </div>
                </div>   
            </main>
        </div>         
    )
}

export default App;
