import React, { useEffect, useState, useRef } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import PropTypes from 'prop-types';
// import 'react-virtualized/styles.css'; // Estilos por defecto
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const TablaConsumo = ({selected}) => {
  const [rows, setRows] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [loading, setLoading] = useState(false);
  const listRef = useRef();
  const [sel, setSel] = useState([selected]);
  // const [, setStompClient] = useState(null);
  // const [updateId, setUpdateId] = useState(null);
  // const [lastSelected, setLastSelected] = useState(null);
  // const stompClient = useRef(null);
  // const [lastUpdate, setLastUpdate] = useState({});



  const handleScroll = ({ scrollTop }) => {
    setScrollPosition(scrollTop);
  };

  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
  //   const stompClient = Stomp.over(socket);

  //   stompClient.connect({}, (frame) => {
  //     console.log('Connected: ' + frame);

  //     // Suscribirse a los mensajes
  //     stompClient.subscribe('/topic/update', (message) => {
  //   if(rows.length == 0 || selected != sel){
  //     fetch('http://localhost:8080/api/history/' + selected.toString())
  //     .then(response => response.json())
  //     .then(data => {
  //       if (!signal.aborted) {
  //         setRows(data);
  //       }
  //     });
  //     setSel(selected);
  //       return () => {
  //         controller.abort();
  //       };
  //     }
  //   else{
  //     console.log("HOLA");
  //         const receivedBuildingId = JSON.parse(message.body);
  //         if (receivedBuildingId === sel) {
  //           // Realizar la solicitud fetch
  //           let noFormatDate = rows[rows.length-1].date;
  //           let dateParts = noFormatDate.split(" ")[1].split("/");
  //           let timePart = noFormatDate.split(" ")[0];
  //           let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timePart}`;
  
  //           fetch('http://localhost:8080/api/history/' + sel.toString() + '/from?fechaMinimaSinIncluir=' + formattedDate)
  //             .then(response => response.json())
  //             .then(data => {
  //               if (!signal.aborted) {
  //                 setRows(prevRows => [...prevRows, ...data]);
  //               }
  //             });
  //         }
  //       }
  //       });
  //     });

  //     return () => {
  //       if (stompClient) {
  //         stompClient.disconnect();
  //       }
  //     };
  // }, [selected]);







  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
    
  //   // Lógica inicial
  //   if(rows.length == 0 || selected != sel){
  //     fetch('http://localhost:8080/api/history/' + selected.toString())
  //     .then(response => response.json())
  //     .then(data => {
  //       if (!signal.aborted) {
  //         setRows(data);
  //       }
  //       setSel(selected);
  //     });
  //   }

  //   // Creación del cliente de Websocket
  //   const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
  //   const stompClient = Stomp.over(socket);

  //   stompClient.connect({}, (frame) => {
  //     console.log('Connected: ' + frame);

  //     // Suscripción a los mensajes
  //     stompClient.subscribe('/topic/update', (message) => {
  //       const receivedBuildingId = JSON.parse(message.body);
  //       console.log('Received building id: ', receivedBuildingId);
  //       console.log('Current selected building id: ', sel);
  //       if (receivedBuildingId === sel) {
  //         // Realizar la solicitud fetch
  //         let noFormatDate = rows[rows.length-1].date;
  //         let dateParts = noFormatDate.split(" ")[1].split("/");
  //         let timePart = noFormatDate.split(" ")[0];
  //         let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timePart}`;

  //         fetch('http://localhost:8080/api/history/' + sel.toString() + '/from?fechaMinimaSinIncluir=' + formattedDate)
  //           .then(response => response.json())
  //           .then(data => {
  //             if (!signal.aborted) {
  //               setRows(prevRows => [...prevRows, ...data]);
  //             }
  //           });
  //       }
  //     });
  //   });

  //   return () => {
  //     if (stompClient) {
  //       stompClient.disconnect();
  //     }
  //     controller.abort();
  //   };
  // }, [selected]);



//Esta funciona bien pero al actualizar un edificio estando en la tabla de otro, se sobrescribe la tabla actual por el edificio actualizado

//   useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     if(!stompClient.current) {
//         const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
//         stompClient.current = Stomp.over(socket);
//     }
  
//     stompClient.current.connect({}, (frame) => {
//         console.log('Connected: ' + frame);

//         // Suscribirse a los mensajes
//         stompClient.current.subscribe('/topic/update', (message) => {
//             const receivedBuildingId = JSON.parse(message.body);
//             if(receivedBuildingId === selected){
//                 fetchData(receivedBuildingId, signal);
//             }
//         });
//     });
  
//     return () => {
//         if (stompClient.current) {
//             stompClient.current.disconnect();
//         }
//     };
// }, []); // Esta dependencia se mantiene vacía para asegurar que se conecte una vez.

// useEffect(() => {
//     const controller = new AbortController();
//     const signal = controller.signal;

//     fetchData(selected, signal);

//     return () => {
//         controller.abort();
//     }
// }, [selected]);

// const fetchData = (id, signal) => {
//     if(rows.length === 0 || selected !== lastSelected) {
//         fetch('http://localhost:8080/api/history/' + id.toString())
//         .then(response => response.json())
//         .then(data => {
//             if (!signal.aborted) {
//                 setRows(data);
//                 setLastSelected(id);
//             }
//         });
//     }
//     else{
//         // Realizar la solicitud fetch
//         let noFormatDate = rows[rows.length-1].date;
//         let dateParts = noFormatDate.split(" ")[1].split("/");
//         let timePart = noFormatDate.split(" ")[0];
//         let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timePart}`;

//         fetch('http://localhost:8080/api/history/' + id.toString() + '/from?fechaMinimaSinIncluir=' + formattedDate)
//         .then(response => response.json())
//         .then(data => {
//             if (!signal.aborted) {
//                 setRows(prevRows => [...prevRows, ...data]);
//             }
//         });
//     }
// }




// useEffect(() => {
//   const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
//   const stompClient = Stomp.over(socket);
//   const controller = new AbortController(); // Crear un nuevo controlador para la conexión del websocket
//     const signal = controller.signal;
  
//   stompClient.connect({}, (frame) => {
//     console.log('Connected: ' + frame);
    
//     stompClient.subscribe('/topic/update', (message) => {
//       const receivedBuildingId = JSON.parse(message.body);
//       if (receivedBuildingId === selected) {
//         setUpdateId(receivedBuildingId);  // Update the state here
//       }
//     });
    
//   });
  
//   return () => {
//     if (!signal.aborted) {
//       stompClient.disconnect();
//     }
//   };
// }, [sel]);

// useEffect(() => {
  
//   // Fetch new data only when 'updateId' or 'props.selected' changes
//   if (updateId !== null || selected !== sel) {
//     fetchNewData();
//   }
// }, [updateId, selected]);

// const fetchNewData = () => {
//   const controller = new AbortController();
//   const signal = controller.signal;
//   if (rows.length === 0 || selected != sel) {
//     fetch('http://localhost:8080/api/history/' + selected.toString())
//       .then(response => response.json())
//       .then(data => {
//         if (!signal.aborted) {
//           setRows(data);
//           setSel(selected);
//         }
//       });
//   } else {
//     console.log("HOLA");
//     let noFormatDate = rows[rows.length-1].date;
//     let dateParts = noFormatDate.split(" ")[1].split("/");
//     let timePart = noFormatDate.split(" ")[0];
//     let formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timePart}`;

//     fetch('http://localhost:8080/api/history/' + selected.toString() + '/from?fechaMinimaSinIncluir=' + formattedDate)
//       .then(response => response.json())
//       .then(data => {
//         if (!signal.aborted) {
//           setRows(prevRows => [...prevRows, ...data]);
//         }
//       });
//   }
// };


useEffect(() => {
  const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
  const client = Stomp.over(socket);

  client.connect({}, () => {
    client.subscribe('/topic/update', (message) => {
      const receivedBuildingId = JSON.parse(message.body);
      if (receivedBuildingId === selected) {
        fetchNewData();
      }
    });
  });

  // Disconnect from the WebSocket when 'selected' changes or the component unmounts
  return () => {
    if (client) {
      client.disconnect();
    }
  };
}, [selected]);

// Fetch new data when 'selected' changes or a new message is received from the WebSocket
useEffect(() => {
  fetchNewData();
}, [selected]);

const fetchNewData = () => {
  // Don't start a new fetch if one is already in progress
  if (loading) return;

  setLoading(true);

  const controller = new AbortController();
  const signal = controller.signal;

  let url;
  if (rows.length > 0 && sel === selected) {
    const lastDate = rows[rows.length - 1].date;
    const dateParts = lastDate.split(" ")[1].split("/");
    const timePart = lastDate.split(" ")[0];
    const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T${timePart}`;

    url = `http://localhost:8080/api/history/${selected}/from?fechaMinimaSinIncluir=${formattedDate}`;
  } else {
    url = `http://localhost:8080/api/history/${selected}`;
  }

  fetch(url, { signal })
    .then(response => response.json())
    .then(data => {
      if (!signal.aborted) {
        if (sel === selected){
        setRows(prevRows => [...prevRows, ...data]);
      } else {
        setRows(data);
        setSel(selected);
      }
    }
    setLoading(false);
  })
  .catch(error => {
    if (error.name !== 'AbortError') {
      console.error('Fetch error:', error);
    }
    setLoading(false);
  });
};



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