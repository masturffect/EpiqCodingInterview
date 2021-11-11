import React, { useState } from 'react';
import { unstable_batchedUpdates } from 'react-dom';
import { TableBody } from './TableBody'
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
                <TableBody sorts={sorts} data={data} columns={columns} />
            </table>
        </div>
    )
}