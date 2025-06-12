import data from "./data";
import { useState } from "react";
import "./styles.css";
function Accordian() {
  const [selected, setSelected] = useState(null);
  const [enableMultiSelection, setEnableMultiSelection] = useState(false);
  const [multiple, setMultiple] = useState([]);

  function handleSingleSelection(currId) {  // handles single selection
    setSelected(currId === selected ? null : currId);
  }

  function handleMultiSelection(currId) {
    let cpyMultiple = [...multiple];
    const findIndexOfCurr = cpyMultiple.indexOf(currId);
     // finding index of currId in the clicked(cpymultiple arr)
    // initially checking after multi btn enabled,intl no indexOf(curr), 
    // i.e if currId not present in arr= -1
    if(findIndexOfCurr === -1) cpyMultiple.push(currId); 
    // pushing currId into cpymultiple arr
    else cpyMultiple.splice(findIndexOfCurr,1); 
    // removing currId by using its index and single element at a time
    setMultiple(cpyMultiple);
  }

  return (
    <div className="wrapper">
      <h2>ACCORDIAN MENU</h2>
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi-Selection
      </button>
      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem) => (
            <div className="item">
              <div
                className="title"
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span> + </span>
              </div>
              {
                enableMultiSelection ? multiple.indexOf(dataItem.id) !== -1 &&
                ( <div className="content">{dataItem.answer}</div>)
                // if btn enabled and adding to multiple arr, if it is not present in it
                : selected === dataItem.id && 
                ( <div className="content">{dataItem.answer}</div>)
                // if btn not enabled then just if it selected show the data based on ID
              }
            </div>
          ))
        ) : (
          <div>No data found</div>
        )}
      </div>
    </div>
  );
}

export default Accordian;
