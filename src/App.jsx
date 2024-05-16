import React, { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

const mockTables = [
  {
    id: "1",
    name: "Employees",
    columns: [
      { column_id: "1_1", name: "Name", column_data_type: "String" },
      { column_id: "1_2", name: "Age", column_data_type: "Number" },
    ],
  },
  {
    id: "2",
    name: "Patients",
    columns: [
      { column_id: "2_1", name: "PatientName", column_data_type: "String" },
      { column_id: "2_2", name: "Disease", column_data_type: "String" },
    ],
  },
];

function App() {
  const [tablesInGrid, setTablesInGrid] = useState([]);
  const [draggedTableId, setDraggedTableId] = useState(null);
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [connections, setConnections] = useState([]);

  const handleDragStart = (e, id) => {
    setDraggedTableId(id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  console.log("1", tablesInGrid);
  const handleDrop = (e) => {
    console.log("2", draggedTableId, e.clientY, e.target.offsetLeft);
    e.preventDefault();
    const tableInGrid = tablesInGrid.find(
      (table) => table.id === draggedTableId
    );
    if (tableInGrid) {
    //  alert("Table already exists in the grid.");

      let innerMove = tablesInGrid.map((item, index) => {
        if (item.id === draggedTableId) {
          return {
            ...item,
            position: {
              x: e.clientX - e.target.offsetLeft - 300,
              y: e.clientY - e.target.offsetTop,
            },
          };
        } else {
          return { ...item };
        }
      });
      setTablesInGrid(innerMove);
    } else {
      const newTable = mockTables.find((table) => table.id === draggedTableId);
      setTablesInGrid([
        ...tablesInGrid,
        {
          ...newTable,
          position: {
            x: e.clientX - e.target.offsetLeft - 400,
            y: e.clientY - e.target.offsetTop,
          },
        },
      ]);
    }
  };

  const handleTableDragStart = (e, id) => {
    setDraggedTableId(id);
  };

  const handleColumnDragStart = (e, tableId, columnId) => {
    setDraggedColumn({ tableId, columnId });
  };

  const handleColumnDrop = (e, tableId, columnId) => {
    if (draggedColumn) {
      setConnections([
        ...connections,
        {
          from: draggedColumn,
          to: { tableId, columnId },
        },
      ]);
      setDraggedColumn(null);
    }
  };

  const handleRemoveTable = (tableId) => {
    setTablesInGrid(tablesInGrid.filter((table) => table.id !== tableId));
    setConnections(
      connections.filter(
        (conn) => conn.from.tableId !== tableId && conn.to.tableId !== tableId
      )
    );
  };

  return (
    <div className="container">
      <LeftPanel tables={mockTables} onDragStart={handleDragStart} />
      <RightPanel
        tablesInGrid={tablesInGrid}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragStart={handleTableDragStart}
        onColumnDragStart={handleColumnDragStart}
        onColumnDrop={handleColumnDrop}
        onRemoveTable={handleRemoveTable}
      />
      {/* Render connection lines */}
      <svg className="connection-lines">
        {connections.map((conn, index) => {
          const fromTable = tablesInGrid.find(
            (table) => table.id === conn.from.tableId
          );
          const toTable = tablesInGrid.find(
            (table) => table.id === conn.to.tableId
          );
          if (fromTable && toTable) {
            const fromColumn = fromTable.columns.find(
              (col) => col.column_id === conn.from.columnId
            );
            const toColumn = toTable.columns.find(
              (col) => col.column_id === conn.to.columnId
            );
            // Calculate positions and draw a line between the columns
            // This requires calculating the actual positions of the elements in the DOM
            return (
              <line
                key={index}
                x1={fromTable.position.x}
                y1={fromTable.position.y}
                x2={toTable.position.x}
                y2={toTable.position.y}
                stroke="black"
              />
            );
          }
          return null;
        })}
      </svg>
    </div>
  );
}

export default App;
