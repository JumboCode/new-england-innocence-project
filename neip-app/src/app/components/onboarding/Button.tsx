import React, { useState } from 'react';
import './Button.css';
const Button: React.FC<{ label: string }> = ({ label }) => {
    const [weather, setWeather] = useState<{ temp: string; description: string } | null>(null);
    
    const fetchWeather = () => {
        fetch('https://api.weather.gov/gridpoints/BOX/69,92/forecast')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                const { temperature, shortForecast } = data.properties.periods[0];
                setWeather({
                    temp: `${temperature}°F`,
                    description: shortForecast,
                });
            })
            .catch((error) => {
                console.error('Error fetching weather:', error);
            });
    };

    return (
        <div className="weather-container">
            <button className="weather-button" onClick={fetchWeather}>
                {label}
            </button>
            {weather && (
                <div className="weather-info">
                    <p>Temperature: {weather.temp}</p>
                    <p>Weather: {weather.description}</p>
                </div>
            )}
        </div>
    );
};

export default Button;
