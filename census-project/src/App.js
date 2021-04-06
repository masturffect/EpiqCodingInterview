/*
  Author: Ian Seal
  Epiq Engineering Coding Interview
  Due Data: 4/7/21
*/

import React, {useState, useEffect} from 'react';
import './App.css';
import CensusTable from "./censustable/CensusTable";

export default function App() {

  const [data, setData] = useState([]) //data from fetch
  const [queryCity, setQueryCity] = useState(""); //query for City
  const [queryState, setQueryState] = useState(""); //query for State
  const minValue = 10000; //set min and max vals for population
  const maxValue = 1000000;
  const [queryMin, setQueryMin] = useState(minValue);
  const [queryMax, setQueryMax] = useState(maxValue);
  
  //fetch census data using react hooks useEffect
  useEffect(() => {
    fetch("https://api.census.gov/data/2016/pep/population?get=POP,GEONAME&for=place:*&key=f4de31756c3fa31aab100b0cf2a657e05eaa40a3")
    .then(response => response.json())
    .then((json) => setData(json));
  }, []);


  const col = (arr, n) => arr.map(x => x[n]); //grabs col of given array

  const geoname = col(data.slice(1), 1); //grab geoname 
  const temp = col(data.slice(1), 0);

  const population = getPopulation(temp); //grab population
  const cities = getCities(geoname); //grab cities
  const states = getStates(geoname); //grab states
 

  const tdata = tableData(cities, states, population.slice(1)); //create new table from data grabbed

  const select_states = grabEachState(states.sort()); //get states for user select

  /*Function name: getPopulation
  /Parameters: first column of api data (populations)
  Purpose: create and return array of populations*/
  function getPopulation(temp){
      let newArr = [];
      for(let i = 0; i < temp.length; i++){
         newArr[i] = data[i][0];
      }
      return newArr;
  }

  /*Function name: getCities
  Parameters: second column of api data (geonames)
  Purpose: parse geoname and return array of city names */
  function getCities(geoname){
      let newArr = [];
      for(let i = 0; i < geoname.length; i++){
          let first = geoname[i].split(",")[0];
          let last = first.lastIndexOf(" ");
          if(last === -1){
            newArr.push(first);
          }
          else{
            first = first.substring(0,last);
            newArr.push(first);
          }
      }
      return newArr;
  }
  
  /*Function name: getStates
  Parameters: second column of api data (geonames)
  Purpose: parse geoname and return array of states */
  function getStates(geoname){
      let newArr = [];
      for(let i = 0; i < geoname.length; i++){
        if(geoname[i].split(",")[2]){
          let state = geoname[i].split(",")[2];
          newArr.push(state);
        }
        else{
          let state = geoname[i].split(",")[1];
          newArr.push(state);
        }    
      }
      return newArr;
  }

  /*Function name: grabEachState
  Parameters: array containing all states from api data
  Purpose: grab states and return state array */
  function grabEachState(states){
    let newArr = [];
    let curr = states[0];
    newArr.push(curr);
    let prev = curr;
    let count = 0;
    while(count != states.length){
      curr = states[count];
      if(prev == curr){
        prev = curr;
      }

      else{
        newArr.push(curr);
        prev = curr;
      }
      count++;
    }
    return newArr;
  }

  /*Function name: tableData
  Parameters: cities, states, and population arrays
  Purpose: create and return 2d array of desired table data */
  function tableData(cities, states, population){
      let newArr = []; 
      for (let i = 0; i < population.length; i++){
          newArr.push([cities[i],states[i],population[i]]);
      }
      return newArr;

  }
  
  /*Function name: filters
  Parameters: table data 
  Purpose: filters table data shown to user by matching queries from inputs*/
  function filters(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) => columns.some(
      (column) => row[column].toString().toLowerCase().indexOf(queryCity.toLowerCase()) > -1)
      &&
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(queryState.toLowerCase()) > -1)
      &&
        parseInt(row[2]) >= queryMin
      &&
        parseInt(row[2]) <= queryMax);
  }
  

  return (
    <div id = "page-container">
      <div id = "filters">

        <div id = "citysearch">
          <label>Search for City Name
            <input type = "text" value = {queryCity} onChange = {(e) => setQueryCity(e.target.value)}/>
          </label>
        </div>

        <div id = "stateselect">
          <label>Select a State:
            <select value = {queryState} onChange = {(e) => setQueryState(e.target.value)}>
            <option value = "none">Select Any State</option>
              {select_states.map(state => (
                <option key ={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div id = "minpop">
          <label>Minimum Population
                <input type = "number" value = {queryMin} onChange = {(e) => setQueryMin(e.target.value)}/>
          </label>
        </div>
        
        <div id = "maxpop">
          <label>Maximum Population
                <input type = "number" value = {queryMax} onChange = {(e) => setQueryMax(e.target.value)}/>
          </label>
        </div>
      </div>
      <div>
        <CensusTable data = {filters(tdata)} /> {/*render table based on filters*/}
      </div>
    </div>
  );
}
