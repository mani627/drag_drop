import React from 'react';

const LeftPanel = ({ tables, onDragStart }) => {
    return (
        <div className="left-panel">
            <ul className="table-list">
                {tables.map(table => (
                    <li
                        key={table.id}
                        className="table-item"
                        draggable
                        onDragStart={(e) => onDragStart(e, table.id)}
                    >
                        {table.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LeftPanel;
