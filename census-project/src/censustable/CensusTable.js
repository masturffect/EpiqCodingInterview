import React, {useState} from 'react';
import { unstable_batchedUpdates } from 'react-dom';

export default function CensusTable({data}){
    const heading = [ "CityName", "State", "Population"]; 
    const columns = heading && Object.keys(heading);

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
            let last = first.lastIndexOf(" ");
            first = first.substring(0,last);
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
    
    function tableData(cities, states, population){
        let newArr = []; 
        for (let i = 0; i < population.length; i++){
            newArr.push([cities[i],states[i],population[i]]);
        }
        return newArr;

    }
    return(
        <table cellPadding={0} cellSpacing={0}>
            <thead>
                <tr>
                    {heading && heading.map((heading) => <th>{heading}</th>)}
                </tr>
            </thead>
            <tbody>
                {tdata.map(row=> <tr>
                    {columns.map(columns => <td>{row[columns]}</td>)}
                </tr>)}
                
            </tbody>
        </table>
    )
}