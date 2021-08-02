import React from "react";

// import Header from "../Header";
import Content from "../Content";
import ChartComponent from "../ChartComponent";

const Page = React.memo(({data, forecast}) => {
  return (
    <>
      {typeof data.cod != "undefined" &&
        <Content weatherData={data} />
      }
      {typeof forecast != "undefined" &&
        <ChartComponent forecastData={forecast} />
      }
    </>
  );
})

export default Page;
