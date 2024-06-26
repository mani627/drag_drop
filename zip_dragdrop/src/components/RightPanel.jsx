import React, { useRef, useEffect, useState } from "react";
import enlarge from "../assets/images/enlarge.png";
import eraser from "../assets/images/eraser.png";

const RightPanel = ({
  tablesInGrid,
  onDrop,
  onDragOver,
  onDragStart,
  onColumnDragStart,
  onColumnDrop,
  onRemoveTable,
}) => {
  const gridRef = useRef(null);

//   useEffect(() => {
//     gridRef.current.addEventListener("scroll", handleScroll);
//     return () => {
//       gridRef.current.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

  return (
    <>
      <div className="right-panel" ref={gridRef}>
        <img className="zoom" src={enlarge} />
        <img className="erase" src={eraser} />
        <div className="grid-area" onDrop={onDrop} onDragOver={onDragOver}>
          {tablesInGrid.map((table) => (
            <div
              key={table.id}
              className="grid-table"
              style={{ left: table.position.x, top: table.position.y }}
              draggable
              onDragStart={(e) => {
                onDragStart(e, table.id);
              }}
            >
              <div className="table-header">
                {table.name}
                <button
                  onClick={() => onRemoveTable(table.id)}
                  className="remove-button"
                >
                  x
                </button>
              </div>

              <ul className="column-list">
                {table.columns.map((column) => (
                  <li
                    key={column.column_id}
                    className="column-item"
                    draggable
                    onDragStart={(e) => {
                      onColumnDragStart(e, table.id, column.column_id);
                    }}
                    onDrop={(e) => onColumnDrop(e, table.id, column.column_id)}
                  >
                    <span className="table-content">
                      <li className="list-items">{column.name}</li>
                      <li className="list-items">{column.column_data_type}</li>
                    </span>
                  </li>
                ))}
              </ul>
              <div className="footer-content">Scroll to see more columns</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default RightPanel;
