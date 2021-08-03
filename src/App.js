import React, { useState, useEffect } from "react";

import fetchP from "./helpers/fetch";
import { useForm } from "./hooks/useForm";
import { useModal } from "./hooks/useModal";

import Header from "./components/Header";
import Page from "./components/Page";
import Error from "./components/Error";

import Select from "react-select";
import TagManager from "react-gtm-module";

import "./App.css";
import coverImage from "./Assets/background.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const tagManagerArgs = {
  gtmId: "GTM-PFBR3FF"
};

const dataTag = [];
TagManager.initialize(tagManagerArgs);
TagManager.dataLayer({
  dataLayer: dataTag
});
const formInitial = {
  city: "",
  codPostal: ""
};

const App = () => {
  const [data, setData] = useState([]);
  // const [find, setFind] = useState([]);
  const [option, setOption] = useState([]);
  const [formValues, handleInputChange, reset] = useForm(formInitial);
  const [isOpenModal, openModal, closeModal, handleStateChange] =
    useModal(true);
  const [forecast, setForecast] = useState([]);
  const [cityOn, setCityOn] = useState(true);
  const [index, setIndex] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setloading] = useState(false);

  const { city, codPostal } = formValues;

  useEffect(() => {
    setloading(true);
    localPosition();
  }, []);

  const localPosition = () => {
    navigator.geolocation.getCurrentPosition(function (position) {
      peticionLatLon(position.coords.latitude, position.coords.longitude);
    });
  };

  const peticionLatLon = async (lat, lon) => {
    const endPoint = `weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_API_KEY}&lang=es`; //find?
    const resp = await fetchP.fetchSinToken(endPoint);
    const body = await resp.json();

    if (body.cod === 200) {
      setData(body);
      peticionForest(body.name);
      peticionFind(body.coord.lat, body.coord.lon);
      dataTag.push({
        event: "temperatura_actual",
        ciudad: body.name,
        temperatura: body.main.temp
      });
      setloading(false);
    } else if (body.cod === "400") {
      setError("Error de locación");
    }
  };

  const peticionFind = async (lat, lon) => {
    const endPoint = `find?lat=${lat}&lon=${lon}&units=metric&cnt=6&appid=${process.env.REACT_APP_API_KEY}&lang=es`;
    const resp = await fetchP.fetchSinToken(endPoint);
    const body = await resp.json();

    if (body.cod === "200") {
      const localData = body.list;
      const cityOption = localData.map(function (item, index) {
        const rObj = {};
        rObj["value"] = index;
        rObj["label"] = item.name;
        return rObj;
      }, {});
      cityOption.shift();
      setOption(cityOption);
      peticionForest(body.list[index].name);
      setloading(false);
    } else if (body.cod === "400") {
      setError(body.message);
      handleStateChange(true);
    } else if (body.cod === "404") {
      setError(body.message);
      handleStateChange(true);
    }
  };

  const peticionCity = async (value, city) => {
    const endPoint = `weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}&lang=es`;
    const resp = await fetchP.fetchSinToken(endPoint);
    const body = await resp.json();
    setloading(false);
    if (body.cod === 200) {
      setData(body);
      setloading(false);
      peticionForest(body.name);
      if (value === "buscador") {
        peticionFind(body.coord.lat, body.coord.lon);
        dataTag.push({
          event: "busqueda_ciudad",
          ciudad: body.name,
          temperatura: body.main.temp
        });
      }
    } else if (body.cod === "400") {
      setError(body.message);
      handleStateChange(true);
    } else if (body.cod === "404") {
      setError(body.message);
      handleStateChange(true);
    }
  };

  const peticionCode = async (codPostal) => {
    const endPoint = `weather?zip=${codPostal},CO&units=metric&appid=${process.env.REACT_APP_API_KEY}&lang=es`;
    const resp = await fetchP.fetchSinToken(endPoint);
    const body = await resp.json();
    if (body.cod === 200) {
      setData(body);
      setloading(false);
      peticionForest(body.name);
      peticionFind(body.coord.lat, body.coord.lon);
      dataTag.push({
        event: "busqueda_ciudad",
        ciudad: body.name,
        temperatura: body.main.temp
      });
    } else if (body.cod === "400") {
      setError(body.message);
      handleStateChange(true);
    } else if (body.cod === "404") {
      setError(body.message);
      handleStateChange(true);
    }
  };

  const peticionForest = async (name) => {
    const endPoint = `forecast?q=${name}&units=metric&appid=${process.env.REACT_APP_API_KEY}&lang=es`;
    const resp = await fetchP.fetchSinToken(endPoint);
    const body = await resp.json();
    if (body.cod === "200") {
      const listData = body.list.map(function (item) {
        const days = [
          "Domingo",
          "Lunes",
          "Martes",
          "Miércoles",
          "Jueves",
          "Viernes",
          "Sábado"
        ];
        const numDay = new Date(item.dt_txt).getDay();
        const nameDay = days[numDay];
        const rObj = {};

        rObj["fecha"] = nameDay;
        rObj["temp_max"] = item.main.temp_max;
        rObj["temp_min"] = item.main.temp_min;
        rObj["descrip"] = item.weather[0].description; //description
        return rObj;
      }, {});
      setForecast(listData);
    } else if (body.cod === "400") {
      setError(body.message);
      handleStateChange(true);
    } else if (body.cod === "404") {
      setError(body.message);
      handleStateChange(true);
    }
  };

  const handleCity = (e) => {
    e.preventDefault();
    setloading(true);
    const value = "buscador";
    peticionCity(value, city);
    reset(formInitial);
  };

  const handleCode = (e) => {
    e.preventDefault();
    peticionCode(codPostal);
    reset(formInitial);
  };

  const onDropdownChange = (value) => {
    setIndex(value.value);
    peticionCity(value.value, value.label);
  };

  const onDropdownChangeSearch = (e) => {
    const el = e.target.value;
    if (el === "0") {
      setCityOn(true);
    } else if (el === "1") {
      setCityOn(false);
    }
  };

  return (
    <div className="container">
      <div className="container-son">
      <img className="img-responsive" src={coverImage} alt=""></img>
      <Header />
        <div className="search-container">
          <select className="btn" onChange={onDropdownChangeSearch}>
            <option value="default" selected>
              Búsqueda por:
            </option>
            <option value="0">Ciudad</option>
            <option value="1">Código</option>
          </select>
          {cityOn ? (
            <form onSubmit={handleCity} id="form1">
              <div className="search-box">
                <input
                  className="search-txt"
                  value={city}
                  name="city"
                  onChange={handleInputChange}
                  placeholder="Ciudad"
                ></input>
                <button className="search-btn" type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleCode}>
              <div className="search-box">
                <input
                  className="search-txt"
                  value={codPostal}
                  name="codPostal"
                  onChange={handleInputChange}
                  placeholder="Cod Postal"
                ></input>
                <button className="search-btn" type="submit">
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </form>
          )}
        </div>
        {error !== null && (
          <Error
            error={error}
            isOpen={isOpenModal}
            closeModal={closeModal}
            openModal={openModal}
          />
        )}
        <Select
          className="select"
          placeholder="Ciudades cercanas"
          value={index}
          options={option}
          onChange={onDropdownChange}
        />
        <Page data={data} forecast={forecast} loading={loading} />
      </div>
    </div>
  );
};

export default App;
