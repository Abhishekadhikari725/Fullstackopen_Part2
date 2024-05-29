import axios from 'axios';

const baseUrl = 'https://restcountries.com/v3.1';

const getAll = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request.then(response => {
    return response.data.map(country => country.name.common);
  });
};

const getCountry = (country) => {
  const request = axios.get(`${baseUrl}/name/${country}`);
  return request.then(response => {
    return response.data.map(a_country => ({
      name: a_country.name.common,
      capital: a_country.capital ? a_country.capital[0] : 'No capital',
      area: a_country.area,
      languages: a_country.languages ? Object.values(a_country.languages) : ['No languages'],
      flag : a_country.flags.png,
    }))[0]; // Assuming you only want the first match
  });
};

export default { getAll, getCountry };

