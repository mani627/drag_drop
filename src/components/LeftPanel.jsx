import React from 'react';
import search from "../assets/images/search.svg"

const LeftPanel = ({ tables, onDragStart }) => {
    return (
        <div className="left-panel">
            <div class="input-container">
                <input type="text" placeholder="Filter by Table Name" class="filter-table" />
                <div class="icon-container">
                    <img src={search} class="search-icon" />
                </div>
            </div>
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
