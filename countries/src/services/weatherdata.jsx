import axios from 'axios';

const apiKey= import.meta.env.VITE_SOME_KEY;
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';

const getweather = (city) => {
  const request = axios.get(`${baseUrl}${city}&appid=${apiKey}&units=metric`);
  return request.then(response => ({
    condition: response.data.weather[0].description,
    icon: response.data.weather[0].icon,
    temperature: response.data.main.temp,
    wind: response.data.wind.speed,
  }));
};

export default { getweather };



