import React, { useEffect, useState } from "react";

export default function CurrentPositionWeather({ city }) {
  // we give the
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");
  const [data, setData] = useState([]);
  console.log(city);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });
      if (lat && long !== "") {
        await fetch(
          `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`
        )
          .then((res) => res.json())
          .then((result) => {
            setData(result);
            console.log(result);
          });
      }
    };
    fetchData();
  }, [lat, long]);

  return <>hi</>;
}
