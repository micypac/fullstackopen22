import React from "react";
import { useState, useEffect } from "react";

const CountryList = ({countries}) => {
    
    if (countries.length === 1) {
        const country = countries[0]
        console.log(country);
        return (
            <div>
                <h1>{country.name.common}</h1>
                <p>capital: {country.capital[0]}</p>
                <p>area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map( (item, idx) => <li key={idx}>{item}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.name.common + " flag"} />

            </div>
        )
    } else if (countries.length <= 10) {
        return (
            <div>
                {countries.map( country => <p key={country.cca2}>{country.name.common}</p>)}
            </div>
        )
    } else {
        return (
            <p>Too many matches, specify another filter.</p>
        )
    }
}

export default CountryList