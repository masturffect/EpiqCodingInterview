//Sort Cities by descending order
export function sortFunctionDescC(a, b){
    if (a[0] === b[0]){
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}
//Sort Cities by ascending order
export function sortFunctionAscC(a, b){
    if (a[0] === b[0]){
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

//Sort States by descending order
export function sortFunctionDescS(a, b){
    if (a[1] === b[1]){
        return 0;
    }
    else {
        return (a[1] < b[1]) ? -1 : 1;
    }
}
//Sort States by ascending order
export function sortFunctionAscS(a, b){
    if (a[1] === b[1]){
        return 0;
    }
    else {
        return (a[1] > b[1]) ? -1 : 1;
    }
}

//Sort Populations by descending order
export function sortFunctionDescP(a, b) {
    if (parseInt(a[2]) === parseInt(b[2])) {
        return 0;
    }
    else {
        return (parseInt(a[2]) < parseInt(b[2])) ? -1 : 1;
    }
}
//Sort Populations by ascending order
export function sortFunctionAscP(a,b) {
    if (parseInt(a[2]) === parseInt(b[2])) {
        return 0;
    }
    else {
        return (parseInt(a[2]) > parseInt(b[2])) ? -1 : 1;
    }
}