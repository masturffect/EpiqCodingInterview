import React, { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import './Census.css';

export default function CensusTable({ data }) {
    const heading = ["CityName", "State", "Population"];
    const columns = heading && Object.keys(heading);
    //set initial setSorts states
    const [sorts, setSorts] = useState({
        oToggle: true, 
        cToggle: false, 
        sToggle: false, 
        pToggle: false, 
        pAsc: false,
        pDesc: true,
        cAsc: false,
        cDesc: true,
        sAsc: false,
        sDesc: true,

    });
    
    //sets proper states when user wants to sort Population
    const onClickSortP = () => {
        setSorts({
            oToggle: false,
            sToggle: false,
            pToggle: true,
            cToggle: false,
            pAsc: !sorts.pAsc,
            pDesc: !sorts.pDesc,
            cAsc: !sorts.cAsc,
            cDesc: !sorts.cDesc,
            sAsc: !sorts.sAsc,
            sDesc: !sorts.sDesc

        })
    }

    //sets proper states when user wants to sort States
    //NOTE: sorting by states seems to only be useful upon
    //initial render since user will select a state
    const onClickSortS = () => {
        setSorts({
            oToggle: false,
            sToggle: true,
            pToggle: false,
            cToggle: false,
            pAsc: !sorts.pAsc,
            pDesc: !sorts.pDesc,
            cAsc: !sorts.cAsc,
            cDesc: !sorts.cDesc,
            sAsc: !sorts.sAsc,
            sDesc: !sorts.sDesc

        })
    }

    //sets proper states when user wants to sort City Names
    const onClickSortC = () => {
        setSorts({
            oToggle: false,
            cToggle: true,
            sToggle: false,
            pToggle: false,
            cAsc: !sorts.cAsc,
            cDesc: !sorts.cDesc,
            pAsc: !sorts.pAsc,
            pDesc: !sorts.pDesc,
            sAsc: !sorts.sAsc,
            sDesc: !sorts.sDesc
        })
    }
    
    //Sort Cities by descending order
    function sortFunctionDescC(a, b){
        if (a[0] === b[0]){
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }
    //Sort Cities by ascending order
    function sortFunctionAscC(a, b){
        if (a[0] === b[0]){
            return 0;
        }
        else {
            return (a[0] > b[0]) ? -1 : 1;
        }
    }

    //Sort States by descending order
    function sortFunctionDescS(a, b){
        if (a[1] === b[1]){
            return 0;
        }
        else {
            return (a[1] < b[1]) ? -1 : 1;
        }
    }
    //Sort States by ascending order
    function sortFunctionAscS(a, b){
        if (a[1] === b[1]){
            return 0;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }

    //Sort Populations by descending order
    function sortFunctionDescP(a, b) {
        if (parseInt(a[2]) === parseInt(b[2])) {
            return 0;
        }
        else {
            return (parseInt(a[2]) < parseInt(b[2])) ? -1 : 1;
        }
    }
    //Sort Populations by ascending order
    function sortFunctionAscP(a,b) {
        if (parseInt(a[2]) === parseInt(b[2])) {
            return 0;
        }
        else {
            return (parseInt(a[2]) > parseInt(b[2])) ? -1 : 1;
        }
    }


  

    return (
        <div id="t-container">
            <table cellPadding={3} cellSpacing={3}>
                <thead>
                    <tr id="header">
                        <th>CityName</th>
                        <button onClick = {onClickSortC}>
                            {sorts.cAsc && "SortAsc"}
                            {!sorts.cAsc && "SortDesc"}
                        </button>
                        <th>State</th>
                        <button onClick = {onClickSortS}>
                            {sorts.sAsc && "SortAsc"}
                            {!sorts.sAsc && "SortDesc"}
                        </button>
                        <th>Population</th>
                        <button onClick = {onClickSortP}>
                            {sorts.pAsc && "SortAsc"}
                            {!sorts.pAsc && "SortDesc"}
                        </button>
                    </tr>
                </thead>
                {sorts.oToggle && 
                    <tbody>
                        {data.map(row => <tr>
                            {columns.map(columns => <td>{row[columns]}</td>)}
                        </tr>)}

                    </tbody>
                }
                {sorts.pToggle && sorts.pAsc &&
                    <tbody>
                        {data.sort(sortFunctionAscP).map(row => <tr>
                            {columns.map(columns => <td>{row[columns]}</td>)}
                        </tr>)}

                    </tbody>
                }
                {sorts.pToggle && sorts.pDesc && 
                    <tbody>
                        {data.sort(sortFunctionDescP).map(row => <tr>
                            {columns.map(columns => <td>{row[columns]}</td>)}
                        </tr>)}

                    </tbody>
                }
                {sorts.sToggle && sorts.sAsc && 
                    <tbody>
                        {data.sort(sortFunctionAscS).map(row => <tr>
                            {columns.map(columns => <td>{row[columns]}</td>)}
                        </tr>)}

                    </tbody>
                }
                {sorts.sToggle && sorts.sDesc && 
                    <tbody>
                        {data.sort(sortFunctionDescS).map(row => <tr>
                            {columns.map(columns => <td>{row[columns]}</td>)}
                        </tr>)}

                    </tbody>
                }
                {sorts.cToggle && sorts.cAsc && 
                    <tbody>
                        {data.sort(sortFunctionAscC).map(row => <tr>
                            {columns.map(columns => <td>{row[columns]}</td>)}
                        </tr>)}

                    </tbody>
                }
                {sorts.cToggle && sorts.cDesc && 
                    <tbody>
                        {data.sort(sortFunctionDescC).map(row => <tr>
                            {columns.map(columns => <td>{row[columns]}</td>)}
                        </tr>)}

                    </tbody>
                }


            </table>
        </div>
    )
}