import './App.css';
import React, { useEffect, useState } from 'react';
import dateMaker from './dateMaker';
import weatherDisplay from './weatherDisplay';
import forecastDisplay from "./forecastDisplay" 


const api = {
    key: "77c5e049fe0b5f2b238f8ee7a7c342c8",
    currenturl:"https://api.openweathermap.org/data/2.5/weather?",
    forecasturl:"https://api.openweathermap.org/data/2.5/forecast?"
}

const cityCoords = [
    { name: "Tampere", lat: "61.4991",lon: "23.7871", id: 1 },
    { name: "Jyväskylä", lat: "62.2415", lon: "25.7209", id: 2 },
    { name: "Kupio", lat: "62.8924", lon: "27.677", id: 3 },            
    { name: "Espoo", lat: "60.25", lon: "24.6667", id:4 }
]


function TestApp() {

    const [weather, setWeather] = useState([])
    const [forecast, setForecast] = useState([])
    const [isLoading2, setIsLoading2] = useState(true)
    const [displaying, setDisplaying] = useState(-1)
 
   


    useEffect(() => {

        const fetchWeather = async () => {
            try {
               const response = await Promise.all(
                    cityCoords.map(city => {
                        return Promise.all([
                            fetch(`${api.currenturl}lat=${city.lat}&lon=${city.lon}&limit=1&appid=${api.key}&units=metric`)
                                .then(res=>res.json()),
                            fetch(`${api.forecasturl}lat=${city.lat}&lon=${city.lon}&limit=1&appid=${api.key}&units=metric`)
                                .then(res=>res.json())
                        ])
                    })
                )
                setWeather(response.map(res => res[0]))
                setForecast(response.map(res => res[1]))
                setIsLoading2(false)
            } catch(error) {
                console.log(error)
            }
        }
        fetchWeather()
    }, [displaying])

    const handleChange = (event) => {
            setDisplaying(event.target.value); //pass the value of the city to setDisplay
    }


    

    return(
<div>
        <div className='title'>
            <div className="banner"></div>
            <h1>Säätutka</h1>
        </div>
        <div className="gridContainer">

            <main>                
                    <div className="city-picker">
                            <select id="dropdown" value={displaying} onChange={handleChange}>
                                <option value={-1}>All Cities</option>
                                <option value={0}>Tampere</option>
                                <option value={1}>Jyväskylä</option>
                                <option value={2}>Kuopio</option>
                                <option value={3}>Espoo</option>
                            </select>
                    </div>
                    <div>
                        {
                            (isLoading2) ? (<div>Loading</div>) 
                            : (displaying>=0) ? (//check first if the value of displaying is over 0, with weather array indexes syncing with the values over 0
                                                    <div className='currentcity'>
                                                        <div>{weatherDisplay(weather[displaying])}</div>
                                                        <div className='forecast'>{forecastDisplay(forecast, displaying)}</div>
                                                    </div>) 
                            : <div>
                                    {weather.map((cityWeather, index) => ( // maps the weather
                                    <div key={index}>
                                        <div>{weatherDisplay(cityWeather)}</div>
                                        <div className='forecast'>{forecastDisplay(forecast, index)}</div>
                                    </div>
                                ))}
                              </div>
                        }
                    </div>                
            </main>
        </div>                
</div>
       
    )

}

export default TestApp