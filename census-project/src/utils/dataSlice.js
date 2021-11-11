export function getCities(geoname){
    let newArr = [];
    for(let i = 0; i < geoname.length; i++){
        let first = geoname[i].split(",")[0];
        let last = first.lastIndexOf(" ");
        if(last === -1){
          newArr.push(first);
        }
        else{
          first = first.substring(0,last);
          newArr.push(first);
        }
    }
    return newArr;
}

/*Function name: getStates
Parameters: second column of api data (geonames)
Purpose: parse geoname and return array of states */
export function getStates(geoname){
    let newArr = [];
    for(let i = 0; i < geoname.length; i++){
      if(geoname[i].split(",")[2]){
        let state = geoname[i].split(",")[2];
        newArr.push(state);
      }
      else{
        let state = geoname[i].split(",")[1];
        newArr.push(state);
      }    
    }
    return newArr;
}

/*Function name: grabEachState
Parameters: array containing all states from api data
Purpose: grab states and return state array */
export function grabEachState(states){
  let newArr = [];
  let curr = states[0];
  newArr.push(curr);
  let prev = curr;
  let count = 0;
  while(count != states.length){
    curr = states[count];
    if(prev == curr){
      prev = curr;
    }

    else{
      newArr.push(curr);
      prev = curr;
    }
    count++;
  }
  return newArr;
}
