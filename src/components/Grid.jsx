import React, { useState, useRef, useEffect } from 'react';
import { useDrop } from 'react-dnd';
import Table from './Table';

function Grid({ tables, onTableRemove }) {
  const [gridPositions, setGridPositions] = useState({}); // Stores table positions on the grid
  const gridRef = useRef(null);

  const [{ canDrop }, drop] = useDrop(() => ({
    accept: 'TABLE',
    drop(item, monitor) {
      const delta = monitor.getDifferenceFromInitialOffset();
      const left = Math.min(gridRef.current.clientWidth - item.item.width, monitor.getClientOffset().x);
      const top = Math.min(gridRef.current.clientHeight - item.item.height, monitor.getClientOffset().y);
      setGridPositions({ ...gridPositions, [item.item.id]: { left, top } });
      return undefined; // Indicate successful drop handling
    },
    canDrop(item, monitor) {
      const { left, top } = monitor.getClientOffset();
      const gridWidth = gridRef.current.clientWidth;
      const gridHeight = gridRef.current.clientHeight;
      return left >= 0 && top >= 0 && left + item.item.width <= gridWidth && top + item.item.height <= gridHeight;
    },
    collect: (monitor) => ({
      isDraggingOver: monitor.isDraggingOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  // Function to handle table resizing (not fully implemented)
  const handleTableResize = (tableId, delta) => {
    setGridPositions((prevPositions) => {
      const updatedPosition = { ...prevPositions[tableId] };
      updatedPosition.width += delta.x;
      updatedPosition.height += delta.y;
      return { ...prevPositions, [tableId]: updatedPosition };
    });
  };

  // Function to handle table removal
  const handleRemoveTable = (tableId) => {
    setGridPositions((prevPositions) => {
      const newPositions = { ...prevPositions };
      delete newPositions[tableId];
      return newPositions;
    });
    onTableRemove(tableId);
  };

  // Optional: Function to draw connection lines (needs further implementation)
  const drawConnectionLine = (sourceTableId, targetTableId) => {
    // Implement logic to draw line between source and target table elements
  };

  useEffect(() => {
    const handleScroll = () => {
      // Update connection lines based on scroll position (if implemented)
    };

    gridRef.current.addEventListener('scroll', handleScroll);

    return () => {
      gridRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={gridRef} className="grid" style={{ background: canDrop ? 'lightblue' : 'none' }}>
      {tables.map((table) => (
        <Table
          key={table.id}
          table={table}
          position={gridPositions[table.id]}
          onResize={handleTableResize}
          onRemove={handleRemoveTable}
          // onConnect={(targetTableId) => drawConnectionLine(table.id, targetTableId)}  // Optional: Pass connect handler
        />
      ))}
    </div>
  );
}

export default Grid;
