import React from "react";

const CountryInfo = ({country}) => {
    return (
      <>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img 
          src={country.flag}
          alt={`Flag of ${country.name}`}
          width="100px"
          height="100px"
        />
      </>
    )
}

export default CountryInfo;