import React, { useEffect, useState, useRef } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import 'react-virtualized/styles.css'; // Estilos por defecto

const VirtualizedTable = () => {
  const [rows, setRows] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef();

  const addRow = () => {
    const newRow = { id: rows.length + 1, title: 'New title' };
    setRows(prevRows => [newRow, ...prevRows]);
  };

  const handleScroll = ({ scrollTop }) => {
    setScrollPosition(scrollTop);
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/history')
      .then(response => response.json())
      .then(data => setRows(data));
  }, []);

  const rowRenderer = ({ index, key, style }) => {
    return (
      <div key={key} style={style}>
        <div>{rows[index].date}</div>
        <div>{rows[index].value}</div>
      </div>
    );
  };

  return (
    <div>
      <button onClick={addRow}>Add row</button>
      <AutoSizer disableHeight>
        {({ width }) => (
          <List
            ref={listRef}
            onScroll={handleScroll}
            scrollTop={scrollPosition}
            width={width}
            height={400}
            rowCount={rows.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualizedTable;