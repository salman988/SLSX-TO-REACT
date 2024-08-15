import React, { useState } from "react";

const DropdownInput = ({ headings, data1, setData1 }) => {
  const [selectedNames, setSelectedNames] = useState({});

  const handleDropdownChange = (e, heading) => {
    heading.ref = e.target.value;
    setData1([...data1]);
    console.log(selectedNames);
  };

  return (
    <div className="container mt-4" >
      {Object.entries(selectedNames).map(([key, value], index) => (
        <div className="row" key={index}>
          <div className="col">{key}: {value}</div>
        </div>
      ))}
      <div className="row">
        {data1.map((heading, index) => (
          <div key={index} className="col-md-4 mb-3 mx-auto">
            <label>{heading.name}</label>
            <br/>
            <select
              className="form-select"
              value={heading.ref || ""}
              onChange={(e) => handleDropdownChange(e, heading)}
            >
              <option value="">Select...</option>
              {headings.map((header, idx) => (
                <option key={idx} value={header}>
                  {header}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownInput;
