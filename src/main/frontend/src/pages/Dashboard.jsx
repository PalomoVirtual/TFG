import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import ConsumoActual from "../components/ConsumoActual";
import TablaConsumo from "../components/TablaConsumo";
import GraficoConsumo from "../components/GraficoConsumo";
import Filtros from "../components/Filtros";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';
import { format, parse } from "date-fns";

export const EdificioContextDashboard = React.createContext();

const Dashboard = () =>{
    const [edificios, setEdificios] = useState(null);
    const [selected, setSelected] = useState(null);
    const [fechaRange, setFechaRange] = useState(null);
    const [consumoRange, setConsumoRange] = useState([-1, -1]);
    const [consumoMinMax, setConsumoMinMax] = useState([-1, -1]);
    // const [fetching, setFetching] = useState(false);
    // const [buffer, setBuffer] = useState([]);
    const [rows, setRows] = useState([]);

    const uniqueSet = new Set();
  // Este Map almacenará las duplicaciones del primer array
  const duplicateMap = new Map();

  // Obtenemos el primer array

  if(rows != undefined){
    // Iteramos sobre cada elemento en el primer array
    rows.forEach((obj) => {
      if (uniqueSet.has(obj.date)) {
        // Si ya hemos visto este elemento, es una duplicación
        // Aquí podríamos incrementar un contador para ese elemento duplicado
        duplicateMap.set(obj.date, (duplicateMap.get(obj.date) || 0) + 1);
      } else {
        // Si no hemos visto este elemento, lo añadimos al Set
        uniqueSet.add(obj.date);
      }
    });
  
    console.log(Array.from(duplicateMap.entries()));
  }
    useEffect(() => {
        fetch('http://localhost:8080/api/building').then(res => {
            return res.json();
        }).then((data) => {
            setEdificios(data);
            if(data.length > 0){
                setSelected(data[0].id);
            }
        });   
    }, []);

    useEffect(() => {
        if(selected){
            fetch('http://localhost:8080/api/history/' + selected.toString() + "/minMax")
                    .then(response => response.json())
                    .then(data => {
                        if(data[0] != null){
                            setConsumoMinMax([data[0], data[1]]);
                        }
                        else{
                            setConsumoMinMax([0, 0]);
                        }
                    });
        }
        setConsumoRange([-1, -1]);
    }, [selected]);

    useEffect(() => {
        if(selected){
            const buffer = [];
            let fetching = false;
            const controller = new AbortController();
            const signal = controller.signal;
            const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
            const stompClient = Stomp.over(socket);
            
            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/update', (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    const receivedBuildingId = receivedMessage.buildingId;
                    if (receivedBuildingId === selected) {
                        console.log("ENTRA BIEN --- ");
                        console.log(receivedMessage);
                        const dateSocket = parse(receivedMessage.date, 'yyyy-MM-dd HH:mm:ss', new Date());
                        console.log("DATESOCKET --- " + dateSocket);
                        if(fechaRange == null || (fechaRange[0] <= dateSocket && dateSocket <= fechaRange[1])){
                            console.log("FETCHING? --- " + fetching);
                            if (fetching) {
                                buffer.push(receivedMessage);
                                // setBuffer(buffer => [...buffer, receivedMessage]);
                            }
                            else {
                                setRows(rows => [...rows, receivedMessage]);
                            }
                        }
                    }
                });
            });
            
            if(fechaRange == null && consumoRange[0] == -1 && consumoRange[1] == -1){
                fetching = true;
                fetch('http://localhost:8080/api/history/' + selected.toString())
                .then(response => response.json())
                .then(data => {
                    if (!signal.aborted) {
                        setRows(data.concat(buffer));
                        buffer.length = 0;
                    }
                    fetching = false;
                });
            }
            else{
                let paramFetch = "?";
                if(fechaRange != null){
                    let fechaInicial = format(fechaRange[0], "yyyy-MM-dd'T'HH:mm:ss");
                    let fechaFinal = format(fechaRange[1], "yyyy-MM-dd'T'HH:mm:ss");
                    paramFetch += "fechaInicial=" + fechaInicial + "&fechaFinal=" + fechaFinal; 
                }
                if(consumoRange[0] != -1){
                    if(paramFetch != "?"){
                        paramFetch += "&";
                    }
                    paramFetch += "consumoInicial=" + consumoRange[0].toString();
                }
                if(consumoRange[1] != -1){
                    if(paramFetch != "?"){
                        paramFetch += "&";
                    }
                    paramFetch += "consumoFinal=" + consumoRange[1].toString();
                }

                fetching = true;
                fetch('http://localhost:8080/api/history/' + selected.toString() + "/from" + paramFetch)
                .then(response => response.json())
                .then(data => {
                if (!signal.aborted) {
                    setRows(data.concat(buffer));
                    buffer.length = 0;
                }
                    fetching = false;
                });
            }

            return () => {
                if (stompClient) {
                    stompClient.disconnect();
                }
                controller.abort();
            };
        }
    }, [selected, fechaRange, consumoRange]);

    return(
        <EdificioContextDashboard.Provider value={{selected, setSelected}}>
            {console.log(rows)}
            <div className="horizontalContainer mainContent">
                {edificios && <SideBar edificios={edificios}></SideBar>}
                <div className="panelCentral horizontalContainer">
                    <div className="verticalContainer columnaIzquierdaDashboard">
                        {selected && <ConsumoActual selected={selected}></ConsumoActual>}
                        {selected && <TablaConsumo rows={rows}></TablaConsumo>}
                    </div>
                    <div className="verticalContainer columnaDerechaDashboard">
                        {selected && <GraficoConsumo rows={rows}></GraficoConsumo>}
                        {consumoMinMax[0] != -1 && consumoMinMax[1] != -1 && <Filtros consumoMinMax={consumoMinMax} setFechaRange={setFechaRange} setConsumoRange={setConsumoRange} consumoRange={consumoRange} fechaRange={fechaRange}></Filtros>}
                    </div>
                </div>
            </div>
        </EdificioContextDashboard.Provider>
    );
};

export default Dashboard;
