import React, {useState} from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import './Census.css';

export default function CensusTable({data}){
    const heading = [ "CityName", "State", "Population"]; 
    const columns = heading && Object.keys(heading);


    return(
        <div id = "t-container">
            <table cellPadding={3} cellSpacing={3}>
            <thead>
                <tr>
                    {data[0] && heading.map((heading) => <th>{heading}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map(row=> <tr>
                    {columns.map(columns => <td>{row[columns]}</td>)}
                </tr>)}
                
            </tbody>
        </table>
        </div>
    )
}