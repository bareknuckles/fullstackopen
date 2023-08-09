// CountryData.js
import React, {useEffect, useState} from "react";
import axios from "axios";

const CountryData = ({query, setCountries, setSelectedCountry}) => {
    // AXIOS CALL
    useEffect(() => {
        if (query.trim() === "") {
        setCountries([]);
        setSelectedCountry(null);
        return;
        }
  
        axios
        .get(`https://restcountries.com/v2/name/${query}`)
        .then((response) => {
            console.log('API Response:', response.data)
            if (response.data.length > 10) {
            setCountries([]);
            setSelectedCountry(null);
            } else if (response.data.length === 1) {
            setCountries([]);
            setSelectedCountry(response.data[0]);
            } else {
            setCountries(response.data);
            setSelectedCountry(null);
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            setCountries([]);
            setSelectedCountry(null);
        });
    }, [query]);

    return null;
}

export default CountryData;