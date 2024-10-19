"use client";
import { useState } from "react";

const MyButton = (props) => {
    const [temperature, setTemperature] = useState("");
    const [weather, setWeather] = useState("");


    const getWeather = () => {
        alert("Getting weather");
        fetch("https://api.weather.gov/gridpoints/BOX/69,92/forecast")
            .then(response => response.json())
            .then(data => {
                console.log(data);
                console.log(`The temperature and weather for day 1 is ${data.properties.periods[0].temperature} degrees Farenheit with a ${data.properties.periods[0].shortForecast} forecast!}`);
                setTemperature(`${data.properties.periods[0].temperature}`);
                setWeather(`${data.properties.periods[0].shortForecast}`);
            })


    };

    return (
        <>
            <button style={{ border: "1px solid #000" }} onClick={getWeather}>
                {props.label}
            </button>

            <p>The temperature and weather for day 1 is {temperature} degrees Farenheit with a {weather} forecast!</p>
        </>



    );
}

export default MyButton;