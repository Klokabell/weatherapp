import './App.css';
import React, { useEffect, useState } from 'react';


const api = {
    key: "77c5e049fe0b5f2b238f8ee7a7c342c8",
    base:"https://api.openweathermap.org/data/2.5/weather?lat=61.4991&lon=23.7871&limit=1&appid="
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
    useEffect(() => {
            fetch(`${api.base}${api.key}&units=metric`)
            .then(res=>res.json())
            .then(res => setWeather(res))
    }, [])

    console.log(weather)

  
    const dateMaker = () => {

        let months = ["January", "February", "March", "April", "May", "June", "July", "August", 
                      "September", "October", "November", "December"];
        
        let d = new Date()
        let day = d.getDate() + " "
        let month = months[d.getMonth()]
        let padMinutes = String(d.getMinutes()).padStart(2, '0')
        let time = d.getHours() + ":" + padMinutes

        let date = [day, month, time]
        return date
    }

    return(
        <div>
            <main>
                <div className="gridcontainer">
                    <div className="city-picker">
                        <label htmlFor="cities">Select the city you want to view</label>
                        <select name="cities" id="cities">
                            <option value="Tampere" id='0'>Tampere</option>
                        </select>
                    </div>
                    {(typeof weather.main != "undefined") ? (
                    <div className='currentweather'>
                        <div className='city'>Tampere</div>
                        <div className="sky">{weather.weather[0].description}</div>
                        <div className="temperature">{Math.round(weather.main.temp)}</div>
                        <div className="date">{dateMaker().slice(0,2)}</div>
                        <div className="time">{dateMaker().slice(2,3)}</div>
                        <div className="extraweather"></div>
                    </div>
                    ) : ('')}

                    <div className="forecast">
                        <div className="plus3"></div>
                        <div className="plus6"></div>
                        <div className="plus9"></div>
                        <div className="plus12"></div>
                        <div className="plus15"></div>
                    </div>
                </div>

            </main>
        </div>

    )
}

export default App;
