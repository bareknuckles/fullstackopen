import React, { useState } from "react";
import "./App.css";
import CountrySearch from "./components/CountrySearch";
import CountryList from "./components/CountryList";
import CountryInfo from "./components/CountryInfo";
import CountryData from "./components/CountryData";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  // EVENT HANDLERS
  const handleFilterChange = (event) => {
    setQuery(event.target.value);
  };
  const handleCountryClick = (countryName) => {
    setQuery(countryName);
  };

  return (
    <main className="App">
      <CountrySearch
        filter="filter"
        type="text"
        label="Find Countries"
        value={query}
        onFilterChange={handleFilterChange}
      />
      <CountryData
        query={query}
        setCountries={setCountries}
        setSelectedCountry={setSelectedCountry}
      />
      {selectedCountry ? (
        <CountryInfo country={selectedCountry} />
      ) : (
        <CountryList
          countries={countries}
          handleCountryClick={handleCountryClick}
        />
      )}
    </main>
  );
};

export default App;
