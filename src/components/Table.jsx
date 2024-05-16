import React, { useState, useRef, useEffect } from 'react';
import { DndProvider, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useDrag } from 'react-dnd';
import ResizeObserver from 'resize-observer-polyfill';

function Table({ table, onTableRemove }) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [size, setSize] = useState({ width: 200, height: 100 }); // Initial table size
  const tableRef = useRef(null);
  const resizeRef = useRef(null);

  const [{ isDropping }, drop] = useDrop(() => ({
    accept: 'TABLE',
    drop(droppedTable) {
      // Handle column drop logic here (optional)
      return undefined;
    },
    collect: (monitor) => ({
      isDropping: monitor.isOver(),
    }),
  }));

  const [{ canDrag }, drag] = useDrag(() => ({
    type: 'TABLE',
    item: table,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    begin: () => setIsDragging(true),
    end: () => setIsDragging(false),
  }));

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      const { contentRect } = entries[0].contentRect;
      setSize({ width: contentRect.width, height: contentRect.height });
    });
    observer.observe(resizeRef.current);

    return () => observer.disconnect();
  }, []);

  const handleResizeStart = (event) => {
    event.stopPropagation();
    setIsResizing(true);
  };

  const handleResize = (event) => {
    if (!isResizing) return;
    const deltaX = event.clientX - event.clientX; // Assuming resizing from right edge
    setSize({ ...size, width: size.width + deltaX });
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  const handleRemoveTable = () => {
    onTableRemove(table.id);
  };

  const renderColumns = () => {
    return table.columns.map((column) => (
      <th key={column.column_id}>{column.name}</th>
    ));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div
        ref={drag}
        className={`table ${isDragging ? 'dragging' : ''}${isDropping ? 'dropping' : ''}`}
        style={{ width: size.width, height: size.height }}
      >
        <div className="table-header">
          {table.name}
          <button onClick={handleRemoveTable}>Remove</button>
        </div>
        <div ref={resizeRef} className="table-body">
          <table>
            <thead>
              <tr>{renderColumns()}</tr>
            </thead>
            <tbody>
              {/* Render table rows here */}
            </tbody>
          </table>
        </div>
        <div className="resize-handle" onMouseDown={handleResizeStart} onMouseMove={handleResize} onMouseUp={handleResizeEnd}>
          {/* Resize handle visual indicator */}
        </div>
        {/* Optional: Render connection lines if using ConnectionLine component */}
        {connectionLines && connectionLines.map((line) => <ConnectionLine key={line.id} from={line.from} to={line.to} />)}
      </div>
    </DndProvider>
  );
}

export default Table;
