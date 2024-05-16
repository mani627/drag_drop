import React, { useRef, useEffect } from 'react';

const RightPanel = ({ tablesInGrid, onDrop, onDragOver, onDragStart, onColumnDragStart, onColumnDrop, onRemoveTable }) => {
    const gridRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            // Adjust connections on scroll
        };

        gridRef.current.addEventListener('scroll', handleScroll);
        return () => {
            gridRef.current.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
        <div className="right-panel" ref={gridRef}>
            <div
                className="grid-area"
                onDrop={onDrop}
                onDragOver={onDragOver}
            >
                {tablesInGrid.map(table => (
                    <div
                        key={table.id}
                        className="grid-table"
                        style={{ left: table.position.x, top: table.position.y }}
                        draggable
                        onDragStart={(e) => { onDragStart(e, table.id) }}
                    >
                        <div className="table-header">
                            {table.name}
                            <button onClick={() => onRemoveTable(table.id)} className='remove-button'>x</button>
                        </div>
                        <ul className="column-list">
                            {table.columns.map(column => (
                                <div
                                    key={column.column_id}
                                    className="column-item"
                                    draggable
                                    onDragStart={(e) => onColumnDragStart(e, table.id, column.column_id)}
                                    onDrop={(e) => onColumnDrop(e, table.id, column.column_id)}
                                >
                                    <div className='table-content'>
                                        <li className="list-items">{column.name}</li>
                                        <li className="list-items">{column.column_data_type}</li>
                                    </div>
                                </div>
                            ))}
                        </ul>
                        <div className='footer-content'>Scroll to see more columns</div>
                    </div>
                ))}
            </div>
        </div>
        </>
    );
};

export default RightPanel;
