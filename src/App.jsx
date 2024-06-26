import React, { useState } from "react";
import LeftPanel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";

// mockdatas
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
  {
    id: "3",
    name: "Associates",
    columns: [
      { column_id: "3_1", name: "AssociatesName", column_data_type: "String" },
      { column_id: "3_2", name: "AssociatesAge", column_data_type: "String" },
    ],
  },
  {
    id: "4",
    name: "Contract Workers",
    columns: [
      {
        column_id: "4_1",
        name: "Contract WorkersName",
        column_data_type: "String",
      },
      {
        column_id: "4_2",
        name: "Contract WorkersAge",
        column_data_type: "String",
      },
      { column_id: "4_3", name: "Contract Period", column_data_type: "String" },
      { column_id: "4_4", name: "Joined Date", column_data_type: "String" },
      { column_id: "4_5", name: "Role", column_data_type: "String" },
      { column_id: "4_6", name: "Location", column_data_type: "String" },
    ],
  },
  {
    id: "5",
    name: "Securities",
    columns: [
      { column_id: "5_1", name: "SecuritiesName", column_data_type: "String" },
      { column_id: "5_2", name: "SecuritiesAge", column_data_type: "String" },
      { column_id: "5_3", name: "Field Name", column_data_type: "String" },
      { column_id: "5_4", name: "Place on Demand", column_data_type: "String" },
    ],
  },
  {
    id: "6",
    name: "Buisness Team",
    columns: [
      { column_id: "6_1", name: "Name", column_data_type: "String" },
      { column_id: "6_2", name: "YOE", column_data_type: "String" },
      { column_id: "6_3", name: "Company Name", column_data_type: "String" },
      { column_id: "6_4", name: "Contribution", column_data_type: "String" },
    ],
  },
  {
    id: "7",
    name: "HR Teams",
    columns: [
      { column_id: "7_1", name: "Name", column_data_type: "String" },
      { column_id: "7_2", name: "Age", column_data_type: "String" },
      { column_id: "7_3", name: "Location", column_data_type: "String" },
      { column_id: "7_4", name: "YOJ", column_data_type: "String" },
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

  const handleDrop = (e) => {
    if (e?.target?.tagName === "LI" || e?.target?.tagName === "SPAN") {
    } else {
      e.preventDefault();
      const tableInGrid = tablesInGrid.find(
        (table) => table.id === draggedTableId
      );
      if (tableInGrid) {
        let innerMove = tablesInGrid.map((item, index) => {
          if (item.id === draggedTableId) {
            return {
              ...item,
              position: {
                x: e.clientX - e.target.offsetLeft ,
                y: e.clientY - e.target.offsetTop,
              },
            };
          } else {
            return { ...item };
          }
        });
        setTablesInGrid(innerMove);
      } else {
        const newTable = mockTables.find(
          (table) => table.id === draggedTableId
        );
        setTablesInGrid([
          ...tablesInGrid,
          {
            ...newTable,
            position: {
              x: e.clientX - e.target.offsetLeft ,
              y: e.clientY - e.target.offsetTop,
            },
          },
        ]);
      }
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
      <LeftPanel
        tables={mockTables}
        onDragStart={handleDragStart}
        tablesInGrid={tablesInGrid}
        mockTablesLength={mockTables.length}
      />
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
          {
            console.log(fromTable, toTable);
          }
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
                x1={fromTable.position.x + 100}
                y1={fromTable.position.y + 70}
                x2={toTable.position.x + 300}
                y2={toTable.position.y + 70}
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
