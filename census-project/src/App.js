import React, {useState, useEffect} from 'react';
import './App.css';
import CensusTable from "./censustable/CensusTable";

export default function App() {

  const [data, setData] = useState([])
  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");
  const minValue = 0;
  const maxValue = 10000000;
  const [query3, setQuery3] = useState(minValue);
  const [query4, setQuery4] = useState(maxValue);
  
  useEffect(() => {
    fetch("https://api.census.gov/data/2016/pep/population?get=POP,GEONAME&for=place:*&key=f4de31756c3fa31aab100b0cf2a657e05eaa40a3")
    .then(response => response.json())
    .then((json) => setData(json));
  }, []);

  const col = (arr, n) => arr.map(x => x[n]);
  const geoname = col(data.slice(1), 1);
  const temp = col(data.slice(1), 0);

  const population = getPopulation(temp);
  //console.log(geoname);
  const cities = getCities(geoname);
  //console.log(cities);

  const states = getStates(geoname);
  //console.log(states)

  const tdata = tableData(cities, states, population.slice(1));

  const select_states = grabEachState(states.sort());

  function getPopulation(temp){
      let newArr = [];
      for(let i = 0; i < temp.length; i++){
         newArr[i] = data[i][0];
      }
      return newArr;
  }

  function getCities(geoname){
      let newArr = [];
      for(let i = 0; i < geoname.length; i++){
          let first = geoname[i].split(",")[0];
          /*let last = first.lastIndexOf(" ");
          if(last === ){
            newArr.push(first);
          }
          else{
            first = first.substring(0,last);
            newArr.push(first);
          }*/
          newArr.push(first);
      }
      return newArr;
  }

  function getStates(geoname){
      let newArr = [];
      for(let i = 0; i < geoname.length; i++){
          let state = geoname[i].split(",")[1];
          newArr.push(state);
      }
      return newArr;
  }

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

  
  function tableData(cities, states, population){
      let newArr = []; 
      for (let i = 0; i < population.length; i++){
          newArr.push([cities[i],states[i],population[i]]);
      }
      return newArr;

  }



  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) => columns.some(
      (column) => row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
      &&
      columns.some(
        (column) => row[column].toString().toLowerCase().indexOf(query2.toLowerCase()) > -1)
      &&
        parseInt(row[2]) >= query3
      &&
        parseInt(row[2]) <= query4);
  }
  

  return (
    <div>
      <div id = "filters">
        <label>Search for City Name
          <input type = "text" value = {query} onChange = {(e) => setQuery(e.target.value)}/>
        </label>
        <label>Select a State:
          <select value = {query2} onChange = {(e) => setQuery2(e.target.value)}>
          <option value = "none">Select Any State</option>
            {select_states.map(state => (
              <option key ={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <label>Minimum Population
              <input type = "number" value = {query3} onChange = {(e) => setQuery3(e.target.value)}/>
        </label>
        <label>Maximum Population
              <input type = "number" value = {query4} onChange = {(e) => setQuery4(e.target.value)}/>
        </label>
      </div>
      <div>
        <CensusTable data = {search(tdata)} />
      </div>
    </div>
  );
}
