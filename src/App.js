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
import Table from "./Table";

function App() {
  const [countries, setCountries] = useState([]); 
  const [country, setCountry] = useState('worldwide'); //I am using worldwide as default on select
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then(response => response.json())
    .then(data => {
      setCountryInfo(data);
    })
  },[])


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

        setTableData(data);
        setCountries(countries);
      });
    };
    getCountriesData();
  }, []);


  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    // Use the country codes derived from disease.sh
    const url = countryCode === "worldwide"  
    ? "https://disease.sh/v3/covid-19/all" 
    : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
    .then(response => response.json())
    .then(data => {
      setCountry(countryCode);

      // Storing all of the data from the country response
      setCountryInfo(data);
    })
  };

  console.log('Country info>>>',countryInfo);

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
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
  
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>Worldwide New Cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
