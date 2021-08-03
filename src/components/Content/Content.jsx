import React, { useState } from "react";

import "./Content.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faWind,
  faTint
} from "@fortawesome/free-solid-svg-icons";
import { faCloudscale } from "@fortawesome/free-brands-svg-icons";

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
    <div className="container-weather">
      <div className="title">
        <h2>{weatherData.name + " , " + weatherData.sys.country}</h2>
      </div>
      <div className="info-general">
        <WeatherIcon style={{ fontSize: 30 }}>{weatherIcon}</WeatherIcon>
        <div className="weather-local">
          <p>{weatherData.main.temp} &deg;C</p>
          <p>{weatherData.weather[0].description}</p>
        </div>
        <div className="weather-temp">
          <div className="fa-caret">
            <FontAwesomeIcon className="icon" icon={faCaretUp} />
            <p>{weatherData.main.temp_max} &deg;C</p>
          </div>
          <div className="fa-caret">
            <FontAwesomeIcon className="icon" icon={faCaretDown} />
            <p>{weatherData.main.temp_min} &deg;C</p>
          </div>
        </div>
      </div>
      <button className="btn-info" onClick={moreInfo}>Más información</button>
      {more ? (
        <div className="more-info">
          <div className="info-in-line">
            <div className="info">
              <FontAwesomeIcon className="icon" icon={faWind} />
              <p>{weatherData.wind.speed} m/s</p>
            </div>
            <div className="info">
              <FontAwesomeIcon className="icon" icon={faTint} />
              <p>{weatherData.main.humidity} %</p>
            </div>
            <div className="info">
              <FontAwesomeIcon className="icon" icon={faCloudscale} />
              <p>Presión: {weatherData.main.sea_level} hPa</p>
            </div>
          </div>
          <div className="sun">
            <svg className="sun-icon" width="185" height="173" viewBox="0 0 185 173" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M150.4 0.200012H96.2L47.4 101.4L150.4 0.200012Z" fill="#F5E6C8"/>
            <path d="M184.2 90.6V39.6L47.4 101.4L184.2 90.6Z" fill="#F5E6C8"/>
            <path d="M0.799988 122.6V146.8L47.4 101.4L0.799988 122.6Z" fill="#F5E6C8"/>
            <path d="M57.2 0.200012H21.6L47.4 101.4L57.2 0.200012Z" fill="#F5E6C8"/>
            <path d="M0.799988 33.6V68L47.4 101.4L0.799988 33.6Z" fill="#F5E6C8"/>
            <path d="M0.799988 88.4V105L47.4 101.4L0.799988 88.4Z" fill="#F5E6C8"/>
            <path d="M47.4 132.4C64.5208 132.4 78.4 118.521 78.4 101.4C78.4 84.2792 64.5208 70.4 47.4 70.4C30.2791 70.4 16.4 84.2792 16.4 101.4C16.4 118.521 30.2791 132.4 47.4 132.4Z" fill="#FFDC6C"/>
            <path d="M184.2 145.4C184.2 154.4 176.4 161.8 167 161.8H125C126 159 126.8 156 126.8 152.8C126.8 142.6 120.6 133.6 111.4 130C111.6 128.4 111.8 126.6 111.8 125C111.8 121.2 111.2 117.4 109.8 114C112.6 111.8 116.2 110.4 120.2 110.4C122 110.4 123.6 110.6 125 111.2C129.2 103.8 137.2 98.8 146.6 98.8C160 98.8 171 109.2 171 122C171 124.4 170.6 126.8 169.8 129C178 130.4 184.2 137.2 184.2 145.4V145.4ZM105.6 133.4C106.4 130.8 106.8 128 106.8 125C106.8 122.6 106.6 120.4 106 118.2C103 106.2 92 97.2 79 97.2C68.4 97.2 59.2 103.2 54.4 112C52.6 111.4 50.8 111.2 48.8 111.2C38.6 111.2 30.2 119.4 30.2 129.8C30.2 131 30.4 132.4 30.6 133.6C21.2 135 14 143.2 14 153C14 163.8 22.8 172.6 33.6 172.6H102C109.6 172.6 116.2 168.2 119.6 161.8C121 159.2 121.8 156 121.8 152.8C122 143.2 115 135 105.6 133.4V133.4Z" fill="#E0E0E0"/>
            </svg>

            <p>
              {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString(
                "en-IN"
              )}
            </p>
            <svg className="sun-icon" width="43" height="39" viewBox="0 0 43 39" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.52502 26.879H41.475" stroke="#F5E169" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M7.07104 30.451H35.929" stroke="#F8B26A" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M10.408 33.976H32.592" stroke="#F47E60" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M17.082 37.548H25.918" stroke="#E15B64" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M31.041 19.218C31.041 13.954 26.811 9.724 21.547 9.724C16.283 9.724 12.1 14.001 12.1 19.218C12.1 20.957 12.57 22.602 13.416 24.012H29.819C30.571 22.602 31.041 20.957 31.041 19.218V19.218Z" fill="#FFDC6C"/>
            <path d="M21.547 1.45203V6.71603" stroke="#F8B26A" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M12.711 3.849L15.296 8.361" stroke="#F8B26A" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M6.17798 10.335L10.737 12.967" stroke="#F8B26A" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M3.828 19.218H9.045" stroke="#F8B26A" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M39.313 19.218H34.096" stroke="#F8B26A" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M36.963 10.335L32.404 12.967" stroke="#F8B26A" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            <path d="M30.43 3.849L27.845 8.361" stroke="#F8B26A" stroke-width="2.15636" stroke-miterlimit="10" stroke-linecap="round"/>
            </svg>

            <p>
              {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                "en-In"
              )}
            </p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Content;
