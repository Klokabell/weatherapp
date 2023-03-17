import { render } from '@testing-library/react'
import App from './App'

test('fetchweather gets called when displaying changes state', () => {
  const fetchWeatherMock = jest.fn()
  const { rerender } = render(<App displaying={true} fetchWeather={fetchWeatherMock} />)
  
  // Checks it's called when the component is initially mounted
  setTimeout(() => {
    expect(fetchWeatherMock).toHaveBeenCalledTimes(1)
  }, 3000)
  
  // Update displaying state and rerender
  rerender(<App displaying={false} fetchWeather={fetchWeatherMock} />)
  
  // Ensure that fetchWeather is called again when displaying changes
  setTimeout(() => {
    expect(fetchWeatherMock).toHaveBeenCalledTimes(2)
  }, 3000)
})