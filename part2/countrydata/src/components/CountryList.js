import React from "react";
// import { useState, useEffect } from "react";
import CountryData from "./CountryData";

const CountryList = ({countries}) => {
    
    if (countries.length === 1) {
        return (
            <CountryData country={countries[0]} showButton={false} showDetail={true} />
        )
    } else if (countries.length <= 10) {
        return (
            <div>
                {countries.map( country => <CountryData key={country.cca2} country={country} showButton={true} showDetail={false} />)}
            </div>            
        )                
    } else {
        return (
            <p>Too many matches, specify another filter.</p>
        )
    }
}

export default CountryList