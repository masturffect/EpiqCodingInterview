import React from 'react'
import { sortFunctionDescC, sortFunctionAscC, sortFunctionDescS,
    sortFunctionAscS, sortFunctionDescP, sortFunctionAscP} from '../utils/sortData';

export function TableBody ({sorts, data, columns}) {
    return(
        <>
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
        </>
    )
}