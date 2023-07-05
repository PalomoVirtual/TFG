import React, { useState, useRef } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import PropTypes from 'prop-types';
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

const TablaConsumoMultiple = ({rows}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef();

  const handleScroll = ({ scrollTop }) => {
    setScrollPosition(scrollTop);
  };

  const rowRenderer = ({ index, key, style }) => {
    let consumoClase = '';
  
    if (index < rows.length - 1) {
      const diferencia = rows[rows.length-1-index].value - rows[rows.length-2-index].value;
      if (diferencia > 0) {
        consumoClase = 'valorConsumoIncrementado';
      } else if (diferencia < 0) {
        consumoClase = 'valorConsumoDecrementado';
      } else {
        consumoClase = 'valorConsumoIgual';
      }
    }

    return (
      <div key={key} style={style} className='horizontalContainer filaTablaConsumo'>
        <div className='fechaConsumo'>{rows[rows.length-1-index].date}</div>
        <div className={"valorConsumo " + consumoClase}>{rows[rows.length-1-index].value} { consumoClase == 'valorConsumoIncrementado' ? <FontAwesomeIcon icon={faSortUp}></FontAwesomeIcon> : consumoClase == 'valorConsumoDecrementado' ? <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon> : <></>}</div>
      </div>
    );
  };

  return (
    <div className='marcoTablaConsumo verticalContainer'>
      <div className='tituloTablaConsumo'>Tabla de consumo (kWh)</div>
      {rows.length > 0 ? <AutoSizer>
        {({height, width }) => (
          <List
            className='listaConsumo'
            ref={listRef}
            onScroll={handleScroll}
            scrollTop={scrollPosition}
            width={width}
            height={height}
            rowCount={rows.length}
            rowHeight={40}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer> : "Vacío"}
    </div>
  );
};

TablaConsumoMultiple.propTypes = {
  rows: PropTypes.array
};

export default TablaConsumoMultiple;