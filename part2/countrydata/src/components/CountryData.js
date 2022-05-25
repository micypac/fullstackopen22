import React from "react";
import { useState } from "react";
import Weather from "./Weather";

const CountryData = ({country, showButton, showDetail}) => {

    const [show, setShow] = useState(showDetail);

    const handleShow = (event) => {
        console.log(event.target.value);
        setShow(!show);
    }

    if (show) {
        return (
            <div>
                <h1>{country.name.common}</h1>
                {(showButton) 
                    ? <button onClick={handleShow}>hide</button>
                    : null
                }
                <p>capital: {country.capital[0]}</p>
                <p>area: {country.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(country.languages).map( (item, idx) => <li key={idx}>{item}</li>)}
                </ul>
                <img src={country.flags.png} alt={country.name.common + " flag"} />
                <Weather capital={country.capital[0]} />                
            </div>
        )
    } else {
        return (
            <div>
                <br />
                {country.name.common}
                <button onClick={handleShow}>show</button>
            </div>
        )
    }    
}

export default CountryData