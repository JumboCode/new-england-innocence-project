//import CSS style
import './Button.css';

//add label prop (?)
interface myButton {
    label: string;
}

//create button
<div>
    <button className="myButton" onClick={pullWeather}>Forecaster</button>
</div>

//pull weather from API
const pullWeather = async () => {
      try {
        const response = await fetch('https://api.weather.gov/gridpoints/BOX/69,92/forecast');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        
        // Extract temp and summary
        const temp = data.properties.periods[0].temperature;
        const shortForecast = data.properties.periods[0].shortForecast;
        
    // test
        console.log(data);
    } catch (error) {
        console.error('Error fetching weather:', error);
    }

    //output
    return (
        <p>Tempurature: {temp} </p>
        <p>Weather: {shortForecast} </p>
    );
}