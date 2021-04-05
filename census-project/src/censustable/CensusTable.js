import React, { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import './Census.css';

export default function CensusTable({ data }) {
    const heading = ["CityName", "State", "Population"];
    const columns = heading && Object.keys(heading);
    const col = (arr, n) => arr.map(x => x[n]);
   
    

    //const sortedData = data.sort();
   

    //const citiesA = tempcities.sort();
    //something to track if its asc or des sort
    //something to sort individual column

    /*sortBy(key) {
        data.sort( (a, b) => a < b);
    }*/

    

    function sortFunction(a, b) {
        if (parseInt(a[2]) === parseInt(b[2])) {
            return 0;
        }
        else {
            return (parseInt(a[2]) < parseInt(b[2])) ? -1 : 1;
        }
    }
    function callSort(){
        alert("Button was Clicked")
        console.log(data[2]);
        data = data.sort(sortFunction)
        
    }

    return (
        <div id="t-container">
            <table cellPadding={3} cellSpacing={3}>
                <thead>
                    <tr id="header">
                        <button onClick = {callSort}>
                            Click Me
                        </button>
                        {heading.map((heading) => <th>{heading}</th>)}
                    </tr>

                </thead>
                <tbody>
                    {data.sort(sortFunction).map(row => <tr>
                        {columns.map(columns => <td>{row[columns]}</td>)}
                    </tr>)}

                </tbody>
            </table>
        </div>
    )
}