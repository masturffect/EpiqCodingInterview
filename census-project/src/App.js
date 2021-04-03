import React, {useState, useEffect} from 'react';
import './App.css';
import CensusTable from "./censustable/CensusTable";

export default function App() {

  const [data, setData] = useState([])
  const [query, setQuery] = useState("")
  useEffect(() => {
    fetch("https://api.census.gov/data/2016/pep/population?get=POP,GEONAME&for=place:*&key=f4de31756c3fa31aab100b0cf2a657e05eaa40a3")
    .then(response => response.json())
    .then((json) => setData(json));
  }, []);
  console.log(data[0]);
  return (
    <div>
      <div>filters</div>
      <div>
        <CensusTable data = {data} />
      </div>
    </div>
  );
}
