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

  const col = (arr, n) => arr.map(x => x[n]);
  const geoname = col(data.slice(1), 1);

  function search(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) => columns.some(
      (column) => row[column].toString().toLowerCase().indexOf(query.toLowerCase()) > -1)
    );
  }

  return (
    <div>
      <div>
        <input type = "text" value = {query} onChange = {(e) => setQuery(e.target.value)}/>
      </div>
      <div>
        <CensusTable data = {search(data)} />
      </div>
    </div>
  );
}
