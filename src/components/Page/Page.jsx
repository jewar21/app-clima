import React from "react";

// import Header from "../Header";
import Content from "../Content";
import ChartComponent from "../ChartComponent";
import Loader from "../Loader";

const Page = React.memo(({ data, forecast, loading}) => {
  return (
    <>
      {loading && <Loader />}
      {typeof data.cod !== "undefined" && <Content weatherData={data} />}
      {typeof forecast !== "undefined" && (
        <ChartComponent forecastData={forecast} />
      )}
    </>
  );
});

export default Page;
