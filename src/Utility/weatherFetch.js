import { useState } from "react"

const FetchWeather = async () => {
    let weather = []
    let forecast = []
    let err
    let isLoading2


    const api = {
        key: "1ae597b551055fdf67ac4360fe7f384c", //                                                        <-------------- API Key goes here
        currenturl:"https://api.openweathermap.org/data/2.5/weather?",
        forecasturl:"https://api.openweathermap.org/data/2.5/forecast?"
    }
    
    const cityCoords = [    //used to fetch the response data
        { name: "Tampere", lat: "61.4991",lon: "23.7871", id: 1 },
        { name: "Jyväskylä", lat: "62.2415", lon: "25.7209", id: 2 },
        { name: "Kupio", lat: "62.8924", lon: "27.677", id: 3 },            
        { name: "Espoo", lat: "60.25", lon: "24.6667", id:4 }
    ]


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
        weather = response.map(res => res[0])
        forecast = response.map(res => res[1])
        isLoading2 = false // allows the page to switch from the loading to the data display. 
    } 
    catch(error) {
        err = true
        isLoading2 = false
    }

    return {weather: weather, err: err, forecast: forecast, isLoading2: isLoading2}
}

export default FetchWeather
