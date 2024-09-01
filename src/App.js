import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import CountryDetail from './CountryDetail'; 

const Home = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then(response => response.json())
      .then(data => {
        setCountries(data.sort((a, b) => a.name.common.localeCompare(b.name.common)));
        setFilteredCountries(data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  useEffect(() => {
    let results = countries.filter(country =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (selectedRegion) {
      results = results.filter(country => country.region === selectedRegion);
    }

    setFilteredCountries(results);
  }, [searchTerm, selectedRegion, countries]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
  };

  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  const CountryCard = ({ country }) => {
    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/country/${country.cca3}`);
    };

    return (
      <div className="country" onClick={handleClick}>
        <img
          src={country.flags.svg}
          alt={country.name.common}
          className="flag"
        />
        <div className="country-info">
          <h2>{country.name.common}</h2>
          <p>Region: {country.region}</p>
          <p>Population: {country.population.toLocaleString()}</p>
          <p>Capital: {country.capital ? country.capital[0] : 'N/A'}</p>
        </div>
      </div>
    );
  };

  return (
    <div className={`app ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <header className="header">
        <h1>Country Info</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          Switch to {isDarkTheme ? 'Light' : 'Dark'} Theme
        </button>
      </header>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <select value={selectedRegion} onChange={handleRegionChange}>
          <option value="">All Regions</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <div className="country-list">
        {filteredCountries.map(country => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:cca3" element={<CountryDetail />} /> 
      </Routes>
    </Router>
  );
};

export default App;
