import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import TableItem from './TableItem'; // Assuming a component for individual table list item

function TableList({ tables, onTableDrop }) {
  return (
    <DndProvider backend={HTML5Backend}>
      <ul className="table-list">
        {tables.map((table) => (
          <TableItem key={table.id} table={table} onTableDrop={onTableDrop} />
        ))}
      </ul>
    </DndProvider>
  );
}

export default TableList;
