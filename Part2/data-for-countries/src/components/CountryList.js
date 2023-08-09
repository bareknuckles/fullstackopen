// CountryList.js
import React from "react";

const CountryList = ({ countries, handleCountryClick }) => {
    return (
      <ul>
        {countries.length >= 10 ? (
          <p>too many countries, specify another filter</p>
        ): (
          <>
            {countries.map((country) => (
              <li key={country.alpha3Code}>
                <button onClick={() => handleCountryClick(country.name.common)}>
                  {country.name.common}{" "}
                </button>
              </li>
            ))}
          </>
        )}
      </ul>
    );
};

export default CountryList;
