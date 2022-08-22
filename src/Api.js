const API_KEY = "d94bcd435b62a031771c35633f9f310a";
const URL = "https://api.openweathermap.org/data/2.5/forecast/daily";

// export const coordinates = (location) => `${URL}weather?q=${location}&appid=${API_KEY}`

export const weatherForecast = (loc) =>
  `${URL}?q=${loc}&units=metric&cnt=7&appid=${API_KEY}`;

// `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`;

export const weatherCurrentPosition = (lat, long) =>
  `${URL}/?lat=${lat}&lon=${long}&units=metric&cnt=7&appid=${API_KEY}`;
