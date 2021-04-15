import './App.css';
import React , { useState,useMemo } from 'react';
import ReactDOM from 'react-dom';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';



const Solution = () => {

  const [intervals,SetIntervals] = useState([]);

  const checkArray = (intervals) => {

                var cycleCheck = 0;
                var deleteFromArray = [];

                if(intervals.length > 1){
                    for(var i = 0;i < intervals.length;i++){

                    for(var j = 0;j < intervals.length;j++){
                        var firstValue = intervals[i][0];
                        var secondValue = intervals[i][1];
                        var firstCompareValue = intervals[j][0];
                        var secondCompareValue = intervals[j][1];

                        if((i != j) && (i < j)){ //saving current structures way
                            //check if values
                            if((secondValue >= firstCompareValue) && (firstCompareValue != secondCompareValue)){
                                //console.log(secondValue + " >= " + firstCompareValue);
                                cycleCheck = 1;
                                var min = 100000;
                                var max = 0;
                                var mergedArray = intervals[i].concat(intervals[j]);
                                for(var u = 0;u < mergedArray.length;u++){
                                    if(mergedArray[u] > max){
                                        max = mergedArray[u];
                                    }

                                    if(mergedArray[u] < min){
                                        min = mergedArray[u];
                                    }

                                }

                                //replace value
                                intervals[i] = [min,max];
                                //replace value

                                deleteFromArray.push(intervals[j]);


                            }
                        }

                    }

                }

                    // //delete current value
                    for(var d = 0;d < deleteFromArray.length;d++){
                          const index = intervals.indexOf(deleteFromArray[d]);
                            if (index > -1) {
                              intervals.splice(index, 1);
                            }
                    }
                    //delete current value

                console.log(intervals);
                    if(cycleCheck != 0){
                        return checkArray(intervals);
                    }else{
                        return intervals;
                    }

                }else{
                    return intervals;
                }
    }

    const error = "string does not represent a set of valid intervals";
    const [showError,SetshowError] = useState(true);
    const [currentInputValue,SetcurrentInputValue] = useState("");

    const setValue = (value) => {

      const regex = /^[0-9]*[,][0-9]*$/g;
      var checkString = regex.test(value);
      if(checkString){
        SetshowError(true);
      }else{
        SetshowError(false);
      }
      SetcurrentInputValue(value);

    }

    const [readyArray,SetReadyArray] = useState([]);

    const addValue = () => {

      if(showError == true){

        var newPushAr = currentInputValue.split(",");
        var reconfigArray = [parseInt(newPushAr[0]),parseInt(newPushAr[1])];
        const newInterval = [...intervals];
        newInterval.push(reconfigArray);
        SetIntervals(newInterval);
        SetcurrentInputValue("");
      }

    }

    useMemo(() => {
      var check = checkArray(intervals);
      SetReadyArray([]);
      SetReadyArray(check);
    },[intervals]);

      return (

        <div className="mainBlock">
            <div className="block">
              <div className="left">
                <TextField className="textInput" value={currentInputValue} onChange={e => setValue(e.target.value)} label="example  - 2,3" />
                {
                  showError == false && (
                    <div className="error">{error}</div>
                  )
                }

              </div>
              <div className="right">
              <Button variant="contained" className="blockButton" onClick={addValue} color="primary">
                  Add
              </Button>
              </div>

            </div>

            <div className="result">
              <code>{JSON.stringify(readyArray)}</code>
            </div>


        </div>
      )

}


class Merge_intervals extends React.Component {

    render() {
      return <Solution/>;
    }

}

export default Merge_intervals;
