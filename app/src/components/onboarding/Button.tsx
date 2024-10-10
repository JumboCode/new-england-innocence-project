import React from "react";
import { useState } from "react";

interface WeatherData {
  temperature: number;
  temperatureUnit: string;
  shortForecast: string;
}

export default function MyButton() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  const handleClick = () => {
    fetch("https://api.weather.gov/gridpoints/BOX/69,92/forecast")
      .then((response) => response.json())
      .then((json) => {
        const currWeather = json.properties.periods[0];
        setWeatherData({
          temperature: currWeather.temperature,
          temperatureUnit: currWeather.temperatureUnit,
          shortForecast: currWeather.shortForecast,
        });
      });
  };

  const containerStyle = {
    margin: "20px",
    textAlign: "center" as "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
  };

  const buttonStyle = {
    backgroundColor: "#4CAF50",
    border: "none",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
  };

  const weatherDataStyle = {
    marginTop: "20px",
  };

  return (
    <div style={containerStyle}>
      <button style={buttonStyle} onClick={handleClick}>
        Show me the weather
      </button>

      {weatherData && (
        <div style={weatherDataStyle}>
          <p>
            Temperature: {weatherData.temperature}°{weatherData.temperatureUnit}
          </p>
          <p>Conditions: {weatherData.shortForecast}</p>
        </div>
      )}
    </div>
  );
}
