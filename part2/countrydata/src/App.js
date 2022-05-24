import axios from "axios";
import {useState, useEffect} from "react";
import CountryList from "./components/CountryList";

const App = () => {

  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  const handleFilter = (event) => {
    setFilter(event.target.value);
  }

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, []);

  const countriesFiltered = !filter
    ? countries
    : countries.filter( country => country.name.official.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Country Data</h1>
      <div>
        find countries 
        <input value={filter} onChange={handleFilter} />
        { (filter)
          ? <CountryList countries={countriesFiltered} />
          : null 
        }
      </div>
    </div>
  )
}

export default App;
