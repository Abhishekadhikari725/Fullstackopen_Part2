import React, { useState, useEffect } from 'react';
import countryservice from './services/countrydata';
import weatherservice from './services/weatherdata';

const Filter = ({ name, newFilter }) => {
  return (
    <>
      <input value={name} onChange={newFilter} placeholder="Search for a country" />
    </>
  );
};

const Display = ({ output, showCountryDetails }) => {
  const makeList = () => {
    if (output !== null) {
      return output.map((country, index) => (
        <li key={index}>
          {country.name}
          <button onClick={() => showCountryDetails(country.name)}>show</button>
        </li>
      ));
    }
  };

  const makeDetails = () => {
    if (output !== null && output.length === 1) {
      const country = output[0];

      const makelanguages = () => {
        return country.languages.map((language, index) => (
          <li key={index}>
            {language}
          </li>
        ));
      };

      // State for weather data
      const [weather, setWeather] = useState(null);

      useEffect(() => {
        weatherservice
          .getweather(country.capital)
          .then((weatherData) => {
            setWeather(weatherData);
          })
          .catch((error) => {
            console.error('Error fetching weather data:', error);
          });
      }, [country.capital]);

      return (
        <div>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} km²</p>
          <br />
          <h3>Languages:</h3>
          <ul>
            {makelanguages()}
          </ul>
          <p>
            <img src={`${country.flag}`} alt={`${country.name} flag`} width="200" height="200" />
          </p>
          {weather && (
            <div>
              <h2>Weather in {country.capital}</h2>
              <p>Temperature: {weather.temperature}°C</p>
              <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather icon" />
              <p>Wind: {weather.wind} m/s</p>
              </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      {output && output.length > 1 && <ul>{makeList()}</ul>}
      {output && output.length === 1 && makeDetails()}
    </div>
  );
};

const App = () => {
  const [name, setName] = useState('');
  const [output, setOutput] = useState(null);
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    countryservice
      .getAll()
      .then((initialCountries) => {
        if (initialCountries && Array.isArray(initialCountries)) {
          const countryNames = initialCountries.map((country) => country);
          console.log('countryNames:', countryNames); // Debugging: Log countryNames to console
          setCountries(countryNames);
        } else {
          setError('Invalid API response format.');
          console.error('Invalid API response format');
        }
      })
      .catch((error) => {
        console.error(error);
        setError('Error during fetching the countries list.');
      });
  }, []);

  const showCountryDetails = (country) => {
    console.log(`Showing all details for ${country}`);
    countryservice
      .getCountry(country)
      .then((countrydetails) => {
        console.log(countrydetails);
        setOutput([countrydetails]); // Ensure it's wrapped in an array for consistency
        setError(null);
      })
      .catch((error) => {
        console.error(error);
        setError(`Error during showing the details of the country ${country}`);
      });
  };

  const newFilter = (event) => {
    const inputName = event.target.value;
    setName(inputName);

    const filteredCountries = inputName
      ? countries.filter((country) => country.toLowerCase().includes(inputName.toLowerCase()))
      : [];

    console.log('filteredCountries:', filteredCountries);

    if (filteredCountries.length < 11 && filteredCountries.length !== 1) {
      setOutput(filteredCountries.map((country) => ({ name: country }))); // Temporary structure for multiple results
      setError(null);
    } else if (filteredCountries.length === 1) {
      console.log(`This is country ${filteredCountries[0]}.`);
      setOutput(null);
      showCountryDetails(filteredCountries[0]);
      setError(null);
    } else {
      setOutput(null);
      setError('Too many matches, specify another filter');
      console.log('Too many matches, specify another filter');
    }
  };

  return (
    <div>
      <h1>Find countries</h1>
      <Filter name={name} newFilter={newFilter} />
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Display output={output} showCountryDetails={showCountryDetails} />
    </div>
  );
};

export default App;
