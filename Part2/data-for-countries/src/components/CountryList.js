import React from "react";

const CountryList = ({ countries, handleCountryClick }) => {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.alpha3Code}>
            <button onClick={() => handleCountryClick(country.name.common)}>
              {country.name.common}
            </button>
          </li>
        ))}
      </ul>
    );
};

export default CountryList;
  