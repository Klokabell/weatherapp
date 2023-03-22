Weather-App README



This is the front-end task for the Etteplan assignment during the Junior Software Engineer hiring process. It’s a weather display application for 4 cities Etteplan has offices in. It displays the weather currently in whichever option is chosen and the forecast for the next 15 hours. The ability to display all 4 cities on screen is also an option, with the layout being designed for mobile (Figure 1.) but being responsive enough for desktop (Figure 2.)





 ![Capture1](https://user-images.githubusercontent.com/33485079/225936794-42ec847b-a146-4c54-b614-15cb51d4c1a3.PNG)

Figure 1.   Mobile View





 ![Capture2](https://user-images.githubusercontent.com/33485079/225936836-47f5a52a-1c9b-4e7d-b3ac-65aa1ede1719.PNG)

Figure 2.   Desktop View
          


Set Up- 

To start with type "npm i" in the console to install the required dependencies.
Once completed do a first time launch by typing "npm start".
The application can then be run by using "npm run" in the console.
Your API key goes in the api object in api.key, marked with a comment.
The fetch unit test, found in App.test.js, can be run with "npm test".
This application was written with React.js, using HTML and standard CSS only and initialised with “create-react-app”.





How it Works -

The main process for retrieving and displaying the data comes from the App.js file’s function App, which serves as the core of everything.
Using the onEffect hook it makes a series of fetch calls to "OpenWeatherAPI, both for the current weather status and the one for the future and does so for each city using the cityCoords object array. In order to keep the data in sync, the useEffect runs the requests through an async function that itself contains a Promise.all when using map on the cityCoords array and the map function contains a callback function that itself returns a Promise.all when performing first the fetch for current weather data and then the fetch for the forecast data. When both promises are completed, they update their respective states using setWeather or setForecast and pass the JSON response into the array. 
The throw catch checks which of the fetch requests out of current and forecast weathers have failed. If there is an issue, it passes a message on screen asking to check the API key in case that’s the issue. 
With the current and forecast weather states set and ready to be used, the isLoading state is changed to false and this allows the page to display the weather data.
The return for App is used to display the main elements of the page with JSX, with the <main> tag mostly. The weather display and dropdown city selector are together in a flex-box column to keep them aligned and responsive. Continuing down the code places the inner elements of the current weather in nested flex-boxes too.
If the page gets too narrow, below 260px width, rather than change the font size the page will change the layout to accommodate everything. The reasoning being that such a small screen would be difficult to read with a smaller font size (figure3).
 
 
 
 ![Capture3](https://user-images.githubusercontent.com/33485079/225936887-05c6f1a6-5ca5-4897-bd35-d12a0d13531f.PNG)

Figure 3.   Narrowest View

The dropdown menu options all have values set to determine which to display, with the default being -1 for all cities. On change, displaying is set to be the value of the option and then it gets used as the index value of the weather array which gets passed into the function “weatherDisplay” as an argument. 
If the value of displaying is less than 0 it will display all the cities in a list using a map function and setting the key to be the value of the index.




Components


dateMaker : 
Used to set the date for the weather and forecast displays to utilise when showing the time and date on their elements. Returns the array [month, day, time, hours].
forecastDisplay: 
Used to return the elements for all the forecast weather containers. One box divided in two horizontally to display the time, icon and temperature on top and the wind, humidity and precipitation on the bottom. Uses a map to pass in the forecast data and the “spot”, index of the object that the array used. The cities order is consistent throughout the code. Each item on the resultant array is an element in a flexbox.

rainCheck: 
The response data doesn’t include rain when it hasn’t occurred for a while, as a result the precipitation isn’t always available. This checks if it exists and then either passes the value back if it does, or returns a string of “0 mm” if it doesn’t.

weatherDisplay: 
Returns the current weather elements in a flexbox Russian doll. The data chosen from the array gets passed in, and then each element in the flexbox selects the value given to display.

weathericon: 
Obtains the weather icon based on the code given by the response data, passing the url to the img tag to use as the src.
