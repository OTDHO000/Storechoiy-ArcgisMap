import Logo from './Image/storechoicy.png';
import './App.css';
import ArcgisMap from './Component/ArcgisMap';
import React, { useState } from 'react';
import callAPIs from './utils';
import City from './Component/City';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const [industry, setIndustry] = useState('restaurant');
  const [type, setType] = useState('RR');
  const [district, setDistrict] = useState('Tsuen Wan District');
  const [sub_district, setSubDistrict] = useState('Tsuen Wan');
  const [rent_min, setRentMin] = useState(400);
  const [rent_max, setRentMax] = useState(50000)
  const paramValue ={
    industry,setIndustry,
    type,setType,
    district,setDistrict,
    sub_district,setSubDistrict,
    rent_min,setRentMin,
    rent_max,setRentMax
  }
  
  
  const [schedule, setSchedule] = useState([]);
  const [allPlaces, setAllPlaces] = useState([]);

  const onSearchClicked = () => {
    const embeddedSearchFields = {
      // city: city,
   
      industry: industry,
      type: type,
      district: district,
      sub_district: sub_district,
      rent_min: rent_min,
      rent_max: rent_max,
    }
    callAPIs(embeddedSearchFields, setAllPlaces, setSchedule);
  }


  return (
    <div className="App">
       <BrowserRouter basename='/ArcgisMap/'>
        <div className="App-header">
          <img src={Logo} width="255" alt="logo" />
        </div>
        <div className="input row">
            <City  paramValue={paramValue}  ></City> 
            <button id="search" variant="contained" onClick={onSearchClicked} >Search</button>
        </div>
        <div id="map" className="map">
          <ArcgisMap schedule={schedule}  allPlaces={allPlaces} /> 
        </div>
       </BrowserRouter>

    </div>
    
  );
}

export default App;
