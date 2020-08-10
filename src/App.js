import React, { useState, useEffect } from 'react';
import { 
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import InfoBox from './InfoBox';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]); 
  const [country, setCountry] = useState('worldwide'); //I am using worldwide as default on select
  
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

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    
    setCountry(countryCode);
  }
  return (
    <div className="app">
      <div className="app__header">
      <h1>COVID TRACKER</h1>
      <FormControl className="app__dropdown">
        <Select
          variant="outlined"
          onChange={onCountryChange}
          value={country}
        >
          
          <MenuItem value="worldwide">Worldwide</MenuItem> 
          {countries.map((country) =>(
            <MenuItem value={country.value}>{country.name}</MenuItem> //Loop through contries
          ))}

          {/* <MenuItem value="worldwide">WorldWide</MenuItem>
          <MenuItem value="worldwide">test 2</MenuItem>
          <MenuItem value="worldwide">test 3</MenuItem>
          <MenuItem value="worldwide">test 4</MenuItem> */}

        </Select>
      </FormControl>
      </div>
      
      <div className="app__stats">
        <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
        <InfoBox title="Recovered" cases={123} total={2000}/>
        <InfoBox title="Deaths" cases={123} total={2000}/>
        
        {/* Infoboxs title = Coronavirus cases */}
        {/* Infoboxs title = Coronavirus recoveries */}
        {/* Infoboxs*/}
      </div>
     

      {/*Table*/}
      {/*Graph*/}

      {/*Map*/}
    
    </div>
  );
}

export default App;
