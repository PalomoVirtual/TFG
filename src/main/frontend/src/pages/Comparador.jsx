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
    const [selected, setSelected] = useState(null);
    const [fechaRange, setFechaRange] = useState(null);
    const [consumoRange, setConsumoRange] = useState([-1, -1]);
    const [consumoMinMax, setConsumoMinMax] = useState([-1, -1]);
    const [fetching, setFetching] = useState(false);
    const [buffer, setBuffer] = useState([]);
    const [rows, setRows] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/building').then(res => {
            return res.json();
        }).then((data) => {
            setEdificios(data);
            setSelected(data[0].id);
        });   
    }, []);

    useEffect(() => {
        if(selected){
            fetch('http://localhost:8080/api/history/' + selected.toString() + "/minMax")
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
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
            console.log(fechaRange);
            console.log(consumoRange);
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
                    const receivedBuildingId = receivedMessage.buildingId;
                    if (receivedBuildingId === selected) {
                        const dateSocket = parse(receivedMessage.date, 'HH:mm:ss dd/MM/yyyy', new Date());
                        if(fechaRange == null || (fechaRange[0] <= dateSocket && dateSocket <= fechaRange[1])){
                            if (fetching) {
                                setBuffer(buffer => [...buffer, receivedMessage]);
                            }
                            else {
                                setRows(rows => [...rows, receivedMessage]);
                            }
                        }
                    }
                });
            });
            
            if(fechaRange == null && consumoRange[0] == -1 && consumoRange[1] == -1){
                fetch('http://localhost:8080/api/history/' + selected.toString())
                .then(response => response.json())
                .then(data => {
                    if (!signal.aborted) {
                        setRows(data.concat(buffer));
                    }
                setFetching(false);
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

                
                fetch('http://localhost:8080/api/history/' + selected.toString() + "/from" + paramFetch)
                .then(response => response.json())
                .then(data => {
                if (!signal.aborted) {
                    console.log("estamos dentro -----  " + paramFetch);
                    console.log(data);


                    setRows(data.concat(buffer));
                }
                setFetching(false);
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
        <EdificioContextComparador.Provider value={{selected, setSelected}}>
            <div className="horizontalContainer mainContent">
                {edificios && <SideBarMultiple edificios={edificios}></SideBarMultiple>}
                <div className="panelCentral horizontalContainer">
                    <div className="verticalContainer columnaIzquierdaDashboard">
                        {selected && <TablaConsumoMultiple rows={rows}></TablaConsumoMultiple>}
                    </div>
                    <div className="verticalContainer columnaDerechaDashboard">
                        {selected && <GraficoConsumoMultiple rows={rows}></GraficoConsumoMultiple>}
                        {consumoMinMax[0] != -1 && consumoMinMax[1] != -1 && <Filtros consumoMinMax={consumoMinMax} setFechaRange={setFechaRange} setConsumoRange={setConsumoRange} consumoRange={consumoRange} fechaRange={fechaRange}></Filtros>}
                    </div>
                </div>
            </div>
        </EdificioContextComparador.Provider>
    );
};

export default Comparador;