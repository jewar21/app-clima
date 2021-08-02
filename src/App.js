import React, { useState, useEffect } from "react";

import fetchP from "./helpers/fetch";
import { useForm } from "./hooks/useForm";

import Header from "./components/Header";
import Page from "./components/Page";

import Select from "react-select";

const formInitial = {
  city: "",
  codPostal: ""
};

const App = () => {
  const [data, setData] = useState([]);
  // const [find, setFind] = useState([]);
  const [option, setOption] = useState([]);
  const [formValues, handleInputChange] = useForm(formInitial);
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

    // console.log("Location: ", body);
    if (body.cod === 200) {
      setData(body);
      peticionForest(body.name);
      peticionFind(body.coord.lat, body.coord.lon);
    }
    setError("Error de locación");
  };

  const peticionFind = async (lat, lon) => {
    const endPoint = `find?lat=${lat}&lon=${lon}&units=metric&cnt=6&appid=${process.env.REACT_APP_API_KEY}&lang=es`;
    const resp = await fetchP.fetchSinToken(endPoint);
    const body = await resp.json();

    // console.log("Location Select: ", body);
    if (body.cod === "200") {
      const localData = body.list;
      const cityOption = localData.map(function (item, index) {
        const rObj = {};
        rObj["value"] = index;
        rObj["label"] = item.name;
        return rObj;
      }, {});
      cityOption.shift();
      // console.log("------>", cityOption);
      setOption(cityOption);
      peticionForest(body.list[index].name);
    }
    setError("Error de locación");
  };

  const peticionCity = async (value, city) => {
    const endPoint = `weather?q=${city}&units=metric&appid=${process.env.REACT_APP_API_KEY}&lang=es`;
    const resp = await fetchP.fetchSinToken(endPoint);
    const body = await resp.json();

    // console.log("city: ", body);
    if (body.cod === 200) {
      setData(body);
      peticionForest(body.name);
      // console.log("---> Name: ", body.name);
      if (value === "buscador") {
        peticionFind(body.coord.lat, body.coord.lon);
      }
    }
    setError("Error, ciudad no encontrada");
  };

  const peticionCode = async (codPostal) => {
    const endPoint = `weather?zip=${codPostal},CO&units=metric&appid=${process.env.REACT_APP_API_KEY}&lang=es`;
    const resp = await fetchP.fetchSinToken(endPoint);
    const body = await resp.json();

    // console.log("CodPostal: ", body);
    if (body.cod === 200) {
      setData(body);
      peticionForest(body.name);
      peticionFind(body.coord.lat, body.coord.lon);
    }
    setError("Error, Código postal no encontrado");
  };

  const peticionForest = async (name) => {
    // console.log("name", name);
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
        // rObj["fecha"] = item.dt_txt.split(/( )/)[0];
        rObj["fecha"] = nameDay;
        rObj["temp_max"] = item.main.temp_max;
        rObj["temp_min"] = item.main.temp_min;
        rObj["descrip"] = item.weather[0].description; //description
        return rObj;
      }, {});
      // console.log("---bodyForest---", listData);
      setForecast(listData);
    }
    setError("Error, pronóstico no establecido");
  };

  const handleCity = (e) => {
    e.preventDefault();
    const value = "buscador";
    // document.getElementById("form1").reset();
    peticionCity(value, city);
    e.target.reset();
    // Llamar peticionCity(city) saca lat y lon y llama peticionLatLon
  };

  const handleCode = (e) => {
    e.preventDefault();
    // console.log("codPostal", codPostal);
    peticionCode(codPostal);
    // Llamar peticionCode(codePostal) saca lat y lon y llama peticionLatLon
  };

  const onDropdownChange = (value) => {
    setIndex(value.value);
    peticionCity(value.value, value.label);
  };

  const seeCity = () => setCityOn(true);
  const seeCode = () => setCityOn(false);

  return (
    <div>
      <Header />
      <button onClick={seeCity}>Ciudad</button>
      <span>O</span>
      <button onClick={seeCode}>Código postal</button>
      {cityOn ? (
        <form onSubmit={handleCity} id="form1">
          <input
            value={city}
            name="city"
            onChange={handleInputChange}
            placeholder="Ciudad"
          ></input>
          <button type="submit">Buscar</button>
        </form>
      ) : (
        <form onSubmit={handleCode}>
          <input
            value={codPostal}
            name="codPostal"
            onChange={handleInputChange}
            placeholder="Cod Postal"
          ></input>
          <button type="submit">Buscar</button>
        </form>
      )}
      <Select value={index} options={option} onChange={onDropdownChange} />
      <Page data={data} forecast={forecast} loading={loading} error={error} />
    </div>
  );
};

export default App;
