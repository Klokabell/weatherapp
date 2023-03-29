import './App.css';
import React, { useEffect, useState } from 'react';
import WeatherDisplay from './Components/WeatherDisplay';
import ForecastDisplay from './Components/ForecastDisplay';
import FetchWeather from './Utility/weatherFetch';




function App() {

    const [displaying, setDisplaying] = useState(-1);
    const [data, setData] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const fetched = await FetchWeather();
            setData(fetched);
        }
        fetchData();
    }, [displaying]);

    const handleChange = (event) => {
        setDisplaying(event.target.value); //pass the value of the city to setDisplay
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    const renderCities = () => {
        if (data.err) {
            return <div>Did you check your api key?</div>;
        }
        if (displaying >= 0) {
            return (
                <div className='individual-city'>
                    <WeatherDisplay weather={data.weather[displaying]} />
                    <ForecastDisplay forecast={data.forecast} displaying={displaying} />
                </div>
            );
        } else {
            return (
                <div className='all-cities'>
                    {data.weather.map((cityWeather, index) => (
                        <div className='individual-city' key={index}>
                            <WeatherDisplay weather={cityWeather} />
                            <ForecastDisplay forecast={data.forecast} displaying={index} />
                        </div>
                    ))}
                </div>
            );
        }
    };

    return (
        <div className='container'>
            <header className='title mobile'>
                <div className='banner'></div>
                <h1>Säätutka</h1>
            </header>
            <main>
                <div className='flex-container mobile'>
                    <div className='city-picker'>
                        <select id='dropdown' value={displaying} onChange={handleChange}>
                            <option value={-1}>All Cities</option>
                            <option value={0}>Tampere</option>
                            <option value={1}>Jyväskylä</option>
                            <option value={2}>Kuopio</option>
                            <option value={3}>Espoo</option>
                        </select>
                    </div>
                    <div className='cities-shown'>{renderCities()}</div>
                </div>
            </main>
        </div>
       
    )

}

export default App

// <ForecastDisplay forecast={forecast} displaying={index} />
// <WeatherDisplay weather ={weather[cityWeather]} />