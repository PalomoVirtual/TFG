import React, { useEffect, useState } from "react";
import Filtros from "../components/Filtros";
import { format, parse } from "date-fns";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import TablaConsumoMultiple from "../components/TablaConsumoMultiple";
import GraficoConsumoMultiple from "../components/GraficoConsumoMultiple";
import SideBarMultiple from "../components/SideBarMultiple";

export const EdificioContextComparador = React.createContext();

const Comparador = () =>{
    const [edificios, setEdificios] = useState(null);
    const [selected, setSelected] = useState(new Set());
    const [fechaRange, setFechaRange] = useState(null);
    const [consumoRange, setConsumoRange] = useState([-1, -1]);
    const [consumoMinMax, setConsumoMinMax] = useState([-1, -1]);
    const [fetching, setFetching] = useState(false);
    const [buffer, setBuffer] = useState({});
    const [rows, setRows] = useState(new Map());

    function select(id){
        setSelected(prev => new Set(prev).add(id));
    }

    function deselect(id) {
        setSelected(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });

        setRows(prev => {
            const newMap = new Map(prev);
            newMap.delete(id);
            return newMap;
        });
      }

    useEffect(() => {
        fetch('http://localhost:8080/api/building').then(res => {
            return res.json();
        }).then((data) => {
            setEdificios(data);
        });   
    }, []);

    useEffect(() => {
        if(selected.size > 0 && edificios != null){
            let min = Infinity;
            let max = -Infinity;
    
            const promises = Array.from(selected).map(id => 
                fetch('http://localhost:8080/api/history/' + id + "/minMax")
                    .then(response => response.json())
                    .then(data => {
                        min = Math.min(min, data[0]);
                        max = Math.max(max, data[1]);
                    })
            );
    
            Promise.all(promises).then(() => setConsumoMinMax([min, max]));
        }
        else{
            setConsumoMinMax([-1, -1])
        }
    }, [selected, edificios]);

    useEffect(() => {
        if(selected.size > 0){
            const controller = new AbortController();
            const signal = controller.signal;
            const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
            const stompClient = Stomp.over(socket);
            
            setBuffer([]);
            setFetching(true);
            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/update', (message) => {
                    const receivedMessage = JSON.parse(message.body);
                    const receivedBuildingId = receivedMessage.buildingId;
                    if (selected.has(receivedBuildingId)) {
                        const dateSocket = parse(receivedMessage.date, 'HH:mm:ss dd/MM/yyyy', new Date());
                        if(fechaRange == null || (fechaRange[0] <= dateSocket && dateSocket <= fechaRange[1])){
                            if (fetching) {
                                setBuffer(prev => {
                                    const existingArray = prev[receivedBuildingId] || [];
                                    return { ...prev, [receivedBuildingId]: [...existingArray, ...receivedMessage] };
                                });
                            }
                            else {
                                setRows(prev => {
                                    const newMap = new Map(prev);
                                    const existingArray = newMap.get(receivedBuildingId) || [];
                                    newMap.set(receivedBuildingId, [...existingArray, ...receivedMessage]);
                                    return newMap;
                                });
                            }
                        }
                    }
                });
            });
            
            if(fechaRange == null && consumoRange[0] == -1 && consumoRange[1] == -1){
                for(let edificio of selected){
                    setFetching(true);
                    fetch('http://localhost:8080/api/history/' + edificio.toString())
                    .then(response => response.json())
                    .then(data => {
                        if (!signal.aborted) {
                            setRows(prev => {
                                const newMap = new Map(prev);
                                newMap.set(edificio, data.concat(buffer));
                                return newMap;
                            });
                        }
                        setFetching(false);
                    });
                }
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

                for(let edificio of selected){
                    setFetching(true);
                    fetch('http://localhost:8080/api/history/' + edificio.toString() + "/from" + paramFetch)
                    .then(response => response.json())
                    .then(data => {
                        if (!signal.aborted) {
                            setRows(prev => {
                                const newMap = new Map(prev);
                                newMap.set(edificio, data.concat(buffer));
                                return newMap;
                            });
                        }
                        setFetching(false);
                    });
                }

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
        <EdificioContextComparador.Provider value={{selected, setSelected}}>
            <div className="horizontalContainer mainContent">
                {edificios && <SideBarMultiple edificios={edificios} select={select} deselect={deselect}></SideBarMultiple>}
                <div className="panelCentral horizontalContainer">
                    <div className="verticalContainer columnaIzquierdaDashboard">
                        {selected && <TablaConsumoMultiple rows={rows}></TablaConsumoMultiple>}
                    </div>
                    <div className="verticalContainer columnaDerechaDashboard">
                        {selected && <GraficoConsumoMultiple rows={rows}></GraficoConsumoMultiple>}
                        {/* {consumoMinMax[0] != -1 && consumoMinMax[1] != -1 && <Filtros consumoMinMax={consumoMinMax} setFechaRange={setFechaRange} setConsumoRange={setConsumoRange} consumoRange={consumoRange} fechaRange={fechaRange}></Filtros>} */}
                        <Filtros consumoMinMax={consumoMinMax} setFechaRange={setFechaRange} setConsumoRange={setConsumoRange} consumoRange={consumoRange} fechaRange={fechaRange}></Filtros>
                    </div>
                </div>
            </div>
        </EdificioContextComparador.Provider>
    );
};

export default Comparador;