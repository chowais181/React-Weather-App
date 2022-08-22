import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import Search from "./components/Search";
import { weatherForecast, weatherCurrentPosition } from "./Api";
import Weather from "./components/Weather";
import Loader from "./components/Loader";
import Footer from "./components/Footer";

function App() {
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [data, setData] = useState(null);
  const [state, setState] = useState({
    value: "",
    data: {},
    current: {},
    weekInfo: [],
    loading: false,
    error: false,
  });

  const handleInputChange = (e) => {
    setState({
      ...state,
      value: e.target.value,
    });
  };

  const handleSearchCity = (e) => {
    e.preventDefault();
    console.log(state.value);

    setState({
      ...state,
      loading: true,
    });
    axios
      .get(weatherForecast(state.value))
      .then((response) => {
        const data = response.data;
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        setState({
          ...state,
          loading: false,
          error: true,
          data: null,
          current: {},
          weekInfo: [],
        });
      });
    // console.log(data);
  };
  // ------------------------------------------
  const handleSearchPosition = (e) => {
    e.preventDefault();

    setState({
      ...state,
      loading: true,
    });
    axios
      .get(weatherCurrentPosition(lat, long))
      .then((response) => {
        const data = response.data;
        setData(data);
      })
      .catch((error) => {
        console.log(error);
        setState({
          ...state,
          loading: false,
          error: true,
          data: null,
          current: {},
          weekInfo: [],
        });
      });
    // console.log(data);
  };

  // ------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
    };
    if (data !== null) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "Nocvember",
        "December",
      ];

      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const currentDate = new Date();
      const date = `${days[currentDate.getDay()]} ${currentDate.getDate()} ${
        months[currentDate.getMonth()]
      }`;

      const sunset = new Date(data.list[0].sunset * 1000)
        .toLocaleTimeString()
        .slice(0, 4);
      const sunrise = new Date(data.list[0].sunrise * 1000)
        .toLocaleTimeString()
        .slice(0, 4);

      const current = {
        city: data.city.name,
        country: data.city.country,
        date,
        population: data.city.population,
        desc: data.list[0].weather[0].description,
        main: data.list[0].weather[0].main,
        icon: data.list[0].weather[0].icon,
        temp: data.list[0].temp.day,
        hTemp: data.list[0].temp.max,
        lTemp: data.list[0].temp.min,
        sunrise,
        sunset,
        clouds: data.list[0].clouds,
        humidity: data.list[0].humidity,
        wind: data.list[0].speed,
        pressure: data.list[0].pressure,
      };

      const weekData = data.list;
      const weekInfo = weekData.map((data, index) => {
        return {
          key: index,
          main: data.weather[0].main,
          day: new Date(data.dt * 1000)
            .toLocaleString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })
            .slice(0, 3),
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          hTemp: data.temp.max,
          lTemp: data.temp.min,
        };
      });

      setState({
        value: data.city.name,
        current,
        weekInfo,
        data: data,
        loading: false,
        error: false,
      });
    }

    fetchData();
    console.log(data);
  }, [data, lat, long]);

  return (
    <>
      <Search
        value={state.value}
        data={state}
        showResult={(state.weatherInfo || state.error) && true}
        change={handleInputChange}
        submit={handleSearchCity}
        position={handleSearchPosition}
      />
      {state.loading === true ? (
        <Loader />
      ) : (
        <div>
          {state.current.country !== undefined ? (
            <div className="weather">
              <Weather today={state.current} weekly={state.weekInfo} />
            </div>
          ) : state.error ? (
            <p className="error__loc">
              Sorry! we do not have any information on specified location.
            </p>
          ) : (
            <div></div>
          )}
        </div>
      )}

      <Footer />
    </>
  );
}

export default App;
