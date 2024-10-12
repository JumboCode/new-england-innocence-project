// Button.tsx
import React, { useState } from 'react';

// Define the props for the Button component
interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => {
  // State to store temperature and weather information
  const [weatherInfo, setWeatherInfo] = useState<string | null>(null);

  // Function to fetch weather data from the API
  const fetchWeather = async () => {
    try {
      const response = await fetch(
        'https://api.weather.gov/gridpoints/BOX/69,92/forecast'
      );

      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const data = await response.json();
      console.log(data); // Print full weather data to the console

      // Extract temperature and weather summary from the first forecast period
      const { temperature, shortForecast } = data.properties.periods[0];
      const weather = `Temperature: ${temperature}°F, ${shortForecast}`;

      console.log(weather); // Log the formatted weather info to the console

      // Update the state with the fetched weather info
      setWeatherInfo(weather);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeatherInfo('Failed to retrieve weather information.');
    }
  };

  return (
    <div className="text-center my-8">
      {/* Button to fetch weather */}
      <button
        className="p-3 border rounded bg-blue-500 text-white hover:bg-blue-600"
        onClick={fetchWeather}
      >
        {label}
      </button>

      {/* Display weather info below the button */}
      <p className="mt-4 text-xl">{weatherInfo || 'Click the button to see the weather!'}</p>
    </div>
  );
};

export default Button;
