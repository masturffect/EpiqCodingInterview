import React, { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import './Census.css';

export default function CensusTable({ data }) {
    const heading = ["CityName", "State", "Population"];
    const columns = heading && Object.keys(heading);
    const col = (arr, n) => arr.map(x => x[n]);
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

    const dataCopy1 = [...data];
    
    
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

    function sortFunctionDescC(a, b){
        if (a[0] === b[0]){
            return 0;
        }
        else {
            return (a[0] < b[0]) ? -1 : 1;
        }
    }

    function sortFunctionAscC(a, b){
        if (a[0] === b[0]){
            return 0;
        }
        else {
            return (a[0] > b[0]) ? -1 : 1;
        }
    }

    function sortFunctionDescS(a, b){
        if (a[1] === b[1]){
            return 0;
        }
        else {
            return (a[1] < b[1]) ? -1 : 1;
        }
    }

    function sortFunctionAscS(a, b){
        if (a[1] === b[1]){
            return 0;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }

    


    function sortFunctionDescP(a, b) {
        if (parseInt(a[2]) === parseInt(b[2])) {
            return 0;
        }
        else {
            return (parseInt(a[2]) < parseInt(b[2])) ? -1 : 1;
        }
    }

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