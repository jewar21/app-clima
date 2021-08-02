import React, { useState } from "react";

// import styles from "./Content.module.css";

import styled from "styled-components";
const WeatherIcon = styled.div`
  color: whitesmoke;
`;

const Content = ({ weatherData }) => {
  const range = weatherData.weather[0].id;
  const icon = weatherData.weather[0].icon;
  const Icono = `${process.env.REACT_APP_ICON_URL}/${icon}@2x.png`;

  const [more, setMore] = useState(false);

  let weatherIcon;

  switch (true) {
    case range >= 200 && range <= 232:
      weatherIcon = <img src={Icono} alt="" />;
      break;
    case range >= 300 && range <= 321:
      weatherIcon = <img src={Icono} alt="" />;
      break;
    case range >= 500 && range <= 531:
      weatherIcon = <img src={Icono} alt="" />;
      break;
    case range >= 600 && range <= 622:
      weatherIcon = <img src={Icono} alt="" />;
      break;
    case range >= 701 && range <= 781:
      weatherIcon = <img src={Icono} alt="" />;
      break;
    case range === 800:
      weatherIcon = <img src={Icono} alt="" />;
      break;
    case range >= 801 && range <= 804:
      weatherIcon = <img src={Icono} alt="" />;

      break;

    default:
      weatherIcon = <img src={Icono} alt="" />;
      break;
  }

  const moreInfo = () => setMore((value) => !value);

  return (
    <>
      <h2>
        Nombre Ciudad: {weatherData.name + " , " + weatherData.sys.country}
      </h2>
      <WeatherIcon style={{ fontSize: 30, marginTop: 15 }}>
        {weatherIcon}
      </WeatherIcon>
      <p>Descripción: {weatherData.weather[0].description}</p>
      <p>Temperatura: {weatherData.main.temp} &deg;C</p>
      <p>Temperatura máxima: {weatherData.main.temp_max} &deg;C</p>
      <p>Temperatura mínima: {weatherData.main.temp_min} &deg;C</p>
      <button onClick={moreInfo}>Más información</button>
      {more ? (
        <>
          <p>Velocidad del viento: {weatherData.wind.speed} m/s</p>
          <p>Humedad: {weatherData.main.humidity} %</p>
          <p>Presión: {weatherData.main.sea_level} hPa</p>
          <p>
            Hora de salida del sol:{" "}
            {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
              "en-IN"
            )}
          </p>
          <p>
            Hora del atardecer:{" "}
            {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
              "en-In"
            )}
          </p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Content;
