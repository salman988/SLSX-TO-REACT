import React from "react";
import "./TableData.css";
const TableData = ({ headings, data }) => (
  <div className="table-responsive">
    {data.length > 0 && (
      <table className="table table-striped table-hover text-center mx-auto">
        <thead className="thead-dark">
          <tr>
            {headings.map((heading, index) => (
              <th key={index}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.values(row).map((value, index) => (
                <td key={index}>{value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )}
  </div>
);

export default TableData;

