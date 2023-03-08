import './App.css';
import React from 'react';
const api = {
    key: "77c5e049fe0b5f2b238f8ee7a7c342c8",
    base:"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid="
}

function App() {
  

    return(
        <main>
            <div className="city-picker">
                <p></p>
                <label htmlFor="cities">Select the city you want to view</label>
                <select name="cities" id="cities">
                    <option value="espoo"></option>
                </select>
            </div>
        </main>
    )
}

export default App;
