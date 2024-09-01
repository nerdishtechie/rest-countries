import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CountryDetail.css'; 

const CountryDetail = () => {
  const { cca3 } = useParams(); 
  const navigate = useNavigate(); 
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${cca3}`)
      .then(response => response.json())
      .then(data => setCountry(data[0]))
      .catch(error => console.error('Error fetching data:', error));
  }, [cca3]);

  const handleGoBack = () => {
    navigate('/'); 
  };

  if (!country) return <p>Loading...</p>;

  return (
    <div className="country-detail">
      <button className="go-back-button" onClick={handleGoBack}>
        Go Back to Home
      </button>
      <h1>{country.name.common}</h1>
      <img src={country.flags.svg} alt={country.name.common} className="flag-detail" />
      <p><strong>Native Name:</strong> {country.name.nativeName ? Object.values(country.name.nativeName)[0].common : 'N/A'}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> {country.region}</p>
      <p><strong>Sub Region:</strong> {country.subregion || 'N/A'}</p>
      <p><strong>Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Top Level Domain:</strong> {country.tld ? country.tld[0] : 'N/A'}</p>
      <p><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</p>
      <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
      <p><strong>Border Countries:</strong> {country.borders ? country.borders.join(', ') : 'N/A'}</p>
    </div>
  );
};

export default CountryDetail;
