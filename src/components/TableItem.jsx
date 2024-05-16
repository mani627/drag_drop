import React from 'react';
import { useDrag } from 'react-dnd';

function TableItem({ table, onTableDrop }) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TABLE',
    item: table,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const handleDrop = () => {
    onTableDrop(table);
  };
console.log(table);
  return (
    <li className={`table-item ${isDragging ? 'dragging' : ''}`} ref={drag} onDrop={handleDrop}>
      {table.name}
    </li>
  );
}

export default TableItem;
