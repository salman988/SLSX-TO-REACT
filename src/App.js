

import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import "./App.css";
import TableData from "./Component/TableData/TableData";
import DropdownInput from "./Component/DropdownInput/DropdownInput";

function App() {
  const [headings, setHeadings] = useState([]);
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const data = await readFile(file);
    if (data) {
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames && workbook.SheetNames[0];
      const sheet = sheetName && workbook.Sheets[sheetName];
      if (sheet) {
        const parsedData = XLSX.utils.sheet_to_json(sheet);
        setData(parsedData);
        const firstRow = parsedData[0];
        const extractedHeadings = Object.keys(firstRow);
        setHeadings(extractedHeadings);
        setData1  ([
          { name: "Hain", ref: "" },
          { name: "Albert", ref: "" },
          { name: "Jonnie", ref: "" },
          { name: "Tony", ref: "" },
        ]);
        window.$("#some").modal("show");
      } else {
        console.error("No sheet");

      }
    }
  };

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(e);
      reader.readAsBinaryString(file);
    });
  };

  return (
    <>
      <button
        className="btn btn-danger "
        onClick={() => {
          window.$("#some").modal("show");
        }}
      >
        Click Me!
      </button>

      <div className="modal" tabIndex="-1" id="some">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header ms-4">
              <h5 className="modal-title  " >SLSX TO REACT</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container  mt-2" >
                <div className="row " >
                  <div className="col mt-4">
                    <input
                      className="form-control mb-3 mx-auto "
                      type="file"
                      accept=".xlsx, .xls"
                      onChange={handleFileUpload}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <TableData headings={headings} data={data} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <DropdownInput
                      setData1={setData1}
                      headings={headings}
                      data1={data1}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" onClick={()=>{
              console.log(data1) ;  
              }} 
              className="btn btn-danger">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

