import React, { useState, useEffect } from 'react';
import { 
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]); 
  
  //USEEFFECT = Runs a piece of code based on given condition

  useEffect(() =>{
    //This bascically runs code only once when the component loads
    //Async = Send Request, wait for it
    const getCountriesData = async () =>{
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso2
          }
        ));

        setCountries(countries);
      });
    };

    getCountriesData();
  }, []);


  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          value="abc"
        >
          {/* Loop through all countries */}

          {countries.map((country) =>(
            <MenuItem value={country.value}>{country.name}</MenuItem>
          ))}
          {/* <MenuItem value="worldwide">WorldWide</MenuItem>
          <MenuItem value="worldwide">test 2</MenuItem>
          <MenuItem value="worldwide">test 3</MenuItem>
          <MenuItem value="worldwide">test 4</MenuItem> */}
        </Select>
      </FormControl>
      </div>
      

      {/* header */}
      {/* Title + dropdown*/}

      {/* Infoboxs*/}
      {/* Infoboxs*/}
      {/* Infoboxs*/}

      {/*Table*/}
      {/*Graph*/}

      {/*Map*/}
    
    </div>
  );
}

export default App;
