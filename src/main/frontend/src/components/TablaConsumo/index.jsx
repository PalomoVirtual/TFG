import React, { useEffect, useState, useRef } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import PropTypes from 'prop-types';
// import 'react-virtualized/styles.css'; // Estilos por defecto
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

const TablaConsumo = ({selected}) => {
  const [rows, setRows] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef();
  const [sel, setSel] = useState([selected]);

  const handleScroll = ({ scrollTop }) => {
    setScrollPosition(scrollTop);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if(rows.length == 0 || selected != sel){

      fetch('http://localhost:8080/api/history/' + selected.toString())
      .then(response => response.json())
      .then(data => {
        if (!signal.aborted) {
          setRows(data);
        }
      });
      setSel(selected);
        return () => {
          controller.abort();
        };
      }
    else{
      let noFormatDate = rows[rows.length-1].date;
      let dateParts = noFormatDate.split(" ")[1].split("/");
      let timePart = noFormatDate.split(" ")[0];
      let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timePart}`;
      fetch('http://localhost:8080/api/history/' + selected.toString() + '/from?fechaMinimaSinIncluir=' + formattedDate)
        .then(response => response.json())
        .then(data => {
          if (!signal.aborted) {
            let newRows = rows;
            for(const historyRegistry of data){
              newRows.push(historyRegistry);
            }
            setRows(newRows);
          }
        });

        return () => {
          controller.abort();
        };
    }
  }, [selected]);

  const rowRenderer = ({ index, key, style }) => {
    let consumoClase = '';
  
    // if (index < rows.length - 1) {
    //   const diferencia = rows[index].value - rows[index + 1].value;
    //   if (diferencia > 0) {
    //     consumoClase = 'valorConsumoIncrementado';
    //   } else if (diferencia < 0) {
    //     consumoClase = 'valorConsumoDecrementado';
    //   } else {
    //     consumoClase = 'valorConsumoIgual';
    //   }
    // }
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

    // return (
    //   <div key={key} style={style} className='horizontalContainer filaTablaConsumo'>
    //     <div className='fechaConsumo'>{rows[index].date}</div>
    //     <div className='valorConsumo'>{rows[index].value}</div>
    //   </div>
    // );
  };

  return (
    <div className='marcoTablaConsumo verticalContainer'>
      <div className='tituloTablaConsumo'>Tabla de consumo (kWh)</div>
      <AutoSizer>
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
      </AutoSizer>
    </div>
  );
};

TablaConsumo.propTypes = {
  selected: PropTypes.number
};

export default TablaConsumo;