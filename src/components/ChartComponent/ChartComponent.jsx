import React from "react";

import { Line } from "react-chartjs-2";
import moment from "moment";
import Modal from "../Modal";
import { useModal } from "../../hooks/useModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faCaretUp,
  faCaretDown
} from "@fortawesome/free-solid-svg-icons";
import "./Chart.css";

const ChartComponent = React.memo(({ forecastData }) => {
  const [isOpenModal, openModal, closeModal] = useModal(false);
  let temp1 = [];
  let temp2 = [];
  let fechaDay = [];
  let getData = [];

  if (forecastData.length !== 0) {
    const days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado"
    ];
    const numDay = new Date(moment().format("")).getDay();
    let fecha = days[numDay];

    for (let i = 0; i < forecastData.length; i++) {
      const item = forecastData[i];
      if (fecha !== item.fecha) {
        fecha = item.fecha;
        let maxDate = item.temp_max;
        let minDate = item.temp_min;
        const descrip = item.descrip;
        const dateArr = forecastData.filter((el) => el.fecha === fecha);

        for (let j = 0; j < dateArr.length; j++) {
          const el = dateArr[j];
          if (el.temp_max > maxDate) {
            maxDate = el.temp_max;
          }
          if (el.temp_min < minDate) {
            minDate = el.temp_min;
          }
        }
        getData.push({
          fecha: item.fecha,
          temp_max: maxDate,
          temp_min: minDate,
          descrip
        });
      }
    }

    if (getData.length > 5) {
      getData = getData.slice(0, 5);
    }
    temp1 = getData.map((item) => item.temp_max);
    temp2 = getData.map((item) => item.temp_min);
    fechaDay = getData.map((item) => item.fecha);
  }

  const data = {
    labels: fechaDay,
    datasets: [
      {
        label: "º Altos",
        data: temp1,
        fill: false,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgba(255, 99, 132, 0.2)"
      },
      {
        label: "º Bajos",
        data: temp2,
        // data: ["2", "3", "4", "5", "8"],
        fill: false,
        backgroundColor: "rgb(100, 149, 237)",
        borderColor: "rgba(70, 130, 180, 0.2)"
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false
          }
        }
      ]
    }
  };

  return (
    <div className="container-forecast">
      <div className="forecast-son">
        <h2>Pronóstico</h2>
        <Line data={data} options={options} />
      </div>
      <button className="btn-modal" onClick={openModal}>
        Días de la semana <FontAwesomeIcon icon={faInfoCircle} />
      </button>
      <Modal isOpen={isOpenModal} closeModal={closeModal}>
        {getData.map((data, index) => {
          return (
            <div key={index} className="modal-content">
              <div className="modal-fecha">
                <p>{data.fecha}</p>
              </div>
              <div className="modal-temp">
                <span>
                  <FontAwesomeIcon icon={faCaretUp} /> {data.temp_max} &deg;C
                </span>
                <span>
                  <FontAwesomeIcon icon={faCaretDown} /> {data.temp_min} &deg;C
                </span>
              </div>
              <div className="modal-desc">
                <span>{data.descrip}</span>
              </div>
            </div>
          );
        })}
      </Modal>
    </div>
  );
});

export default ChartComponent;
