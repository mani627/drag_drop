import React from "react";

const LeftPanel = ({ tables, onDragStart, tablesInGrid, mockTablesLength }) => {
  return (
    <div className="left-panel">
      <ul className="table-list">
        {tables.map((table) => (
          <li
            key={table.id}
            className="table-item"
            draggable
            onDragStart={(e) => {
              if (tablesInGrid?.length >= mockTablesLength) {
                alert("Already Table Exist in Grid");
              } else {
                onDragStart(e, table.id);
              }
            }}
          >
            {table.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeftPanel;
