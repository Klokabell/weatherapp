import './App.css';
import React, { useEffect, useState } from 'react';
import weatherDisplay from './weatherDisplay';
import forecastDisplay from "./forecastDisplay" 


const api = {
    key: "", //                                                        <-------------- API Key goes here
    currenturl:"https://api.openweathermap.org/data/2.5/weather?",
    forecasturl:"https://api.openweathermap.org/data/2.5/forecast?"
}

const cityCoords = [    //used to fetch the response data
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
    const [err, setError] = useState(false)
   


    useEffect(() => {

        const fetchWeather = async () => {
            try {
               const response = await Promise.all(   // awaits all the fetch requests for all the cities to be done to avoid undefined errors
                    cityCoords.map(city => {
                        return Promise.all([
                            fetch(`${api.currenturl}lat=${city.lat}&lon=${city.lon}&limit=1&appid=${api.key}&units=metric`)
                                .then(res=> {
                                    if(!res.ok)
                                        throw new Error('Current weather API response not OK')
                                    return res.json()}),
                            fetch(`${api.forecasturl}lat=${city.lat}&lon=${city.lon}&limit=1&appid=${api.key}&units=metric`)
                                .then(res=>{
                                    if(!res.ok)
                                        {throw new Error('Weather forecast API response not OK')}
                                return res.json()
                            })
                        ])
                    })
                )
                setWeather(response.map(res => res[0]))
                setForecast(response.map(res => res[1]))
                setIsLoading2(false) // allows the page to switch from the loading to the data display. 
            } 
            catch(error) {
                setError(true)
                setIsLoading2(false)
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
                                <select id="dropdown" value={displaying} onChange={handleChange}> {/* This sets the value to match the choice, then renders the page to reflect the selection*/}
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
                                : (err) ? (<div>Did you check your api key?</div>)
                                : (displaying>=0) ? (//check first if the value of displaying is over 0, with weather array indexes syncing with the values over 0
                                                        <div className='individual-city'>
                                                            <div className='current-weather mobile'>{weatherDisplay(weather[displaying])}</div>
                                                            <div className='forecast'>{forecastDisplay(forecast, displaying)}</div>
                                                        </div>) 
                                :   <div className='all-cities'>     
                                        {weather.map((cityWeather, index) => ( // maps the weather for each city to list them all
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