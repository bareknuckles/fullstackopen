// Country Search
import React from "react";

const CountrySearch = ({filter, label, type, value, onFilterChange}) => {
    return (
      <>
        <label htmlFor={filter}>{label}</label>
        <input 
          type={type}
          id={filter}
          value={value}
          onChange={onFilterChange}
        />
      </>
    );
}

export default CountrySearch;