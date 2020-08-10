import React, { useState, useEffect } from 'react';
import { 
  MenuItem,
  FormControl,
  Select,
  CardContent,
  Card,
} from "@material-ui/core";
import InfoBox from './InfoBox';
import './App.css';
import Map from "./Map";

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
      <div className="app__left">
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
            </Select>
          </FormControl>
        </div>
        
        <div className="app__stats">
          <InfoBox title="Coronavirus Cases" cases={123} total={2000}/>
          <InfoBox title="Recovered" cases={123} total={2000}/>
          <InfoBox title="Deaths" cases={123} total={2000}/>
        </div>
  
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <h3>Worldwide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
