import './App.css';
import React, { useEffect, useState } from 'react';
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


function App() {

    const [weather, setWeather] = useState([])
    const [forecast, setForecast] = useState([])
    const [isLoading2, setIsLoading2] = useState(true)
    const [displaying, setDisplaying] = useState(-1)
    const [error, setError] = useState('')
   


    useEffect(() => {

        const fetchWeather = async () => {
            try {
               const response = await Promise.all(
                    cityCoords.map(city => {
                        return Promise.all([
                            fetch(`${api.currenturl}lat=${city.lat}&lon=${city.lon}&limit=1&appid=${api.key}&units=metric`)
                                .then(res=> {
                                    if(!res.ok)
                                        {throw new Error(response.statusText)}
                                    return res.json()}),
                            fetch(`${api.forecasturl}lat=${city.lat}&lon=${city.lon}&limit=1&appid=${api.key}&units=metric`)
                                .then(res=>{
                                    if(!res.ok)
                                        {throw new Error(response.statusText)}
                                    return res.json()})
                        ])
                    })
                )
                setWeather(response.map(res => res[0]))
                setForecast(response.map(res => res[1]))
                setIsLoading2(false)
            } 
            catch(error) {
                setError('Error with the data fetch: ', error.message)
            }
        }
        fetchWeather()

    }, [displaying])

    const handleChange = (event) => {
            setDisplaying(event.target.value); //pass the value of the city to setDisplay
    }


    

    return(
        <div className='container'>
                <header className='title mobile'>
                    <div className="banner"></div>
                    <h1>Säätutka</h1>
                </header>
                <main>
                    <div className="flex-container mobile">    
                        <div className="city-picker">
                                <select id="dropdown" value={displaying} onChange={handleChange}>
                                    <option value={-1}>All Cities</option>
                                    <option value={0}>Tampere</option>
                                    <option value={1}>Jyväskylä</option>
                                    <option value={2}>Kuopio</option>
                                    <option value={3}>Espoo</option>
                                </select>
                        </div>
                        <div className='cities-shown'>
                            {
                                (isLoading2) ? (<div>Loading</div>) 
                                : (displaying>=0) ? (//check first if the value of displaying is over 0, with weather array indexes syncing with the values over 0
                                                        <div className='individual-city'>
                                                            <div className='current-weather mobile'>{weatherDisplay(weather[displaying])}</div>
                                                            <div className='forecast'>{forecastDisplay(forecast, displaying)}</div>
                                                        </div>) 
                                :   <div className='all-cities'>
                                        {weather.map((cityWeather, index) => ( // maps the weather
                                            <div className='individual-city' key={index}>
                                                <div className='current-weather mobile'>{weatherDisplay(cityWeather)}</div>
                                                <div className='forecast'>{forecastDisplay(forecast, index)}</div>
                                            </div>
                                        ))}
                                    </div>
                            }
                        </div>                
                    </div>                
                </main>   
        </div>
       
    )

}

export default App