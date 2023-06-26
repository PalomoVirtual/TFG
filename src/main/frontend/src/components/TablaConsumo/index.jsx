import React, { useEffect, useState, useRef } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import PropTypes from 'prop-types';
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const TablaConsumo = ({selected}) => {
  const [rows, setRows] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [fetching, setFetching] = useState(false);
  const [buffer, setBuffer] = useState([]);
  const listRef = useRef();

  const handleScroll = ({ scrollTop }) => {
    setScrollPosition(scrollTop);
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    const stompClient = Stomp.over(socket);
    
    setBuffer([]);
    setFetching(true);
    stompClient.connect({}, (frame) => {
      console.log('Connected: ' + frame);
      stompClient.subscribe('/topic/update', (message) => {
        const receivedMessage = JSON.parse(message.body);
        console.log(receivedMessage);
        const receivedBuildingId = receivedMessage.buildingId;
        if (receivedBuildingId === selected) {
          if (fetching) {
            setBuffer(buffer => [...buffer, receivedMessage]);
          } else {
            setRows(rows => [...rows, receivedMessage]);
          }
        }
      });
    });
    
    fetch('http://localhost:8080/api/history/' + selected.toString())
    .then(response => response.json())
    .then(data => {
      if (!signal.aborted) {
        setRows(data.concat(buffer));
      }
      setFetching(false);
    });

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
      controller.abort();
    };
  }, [selected]);

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