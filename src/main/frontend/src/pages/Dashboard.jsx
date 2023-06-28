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
    const [consumoRange, setConsumoRange] = useState([0, 1000]);
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
            
            if(fechaRange == null && consumoRange[0] == 0 && consumoRange[1] == 1000){
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
                if(consumoRange[0] != 0){
                    if(paramFetch != "?"){
                        paramFetch += "&";
                    }
                    paramFetch += "consumoInicial=" + consumoRange[0].toString();
                }
                if(consumoRange[1] != 0){
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
        <EdificioContextDashboard.Provider value={{selected, setSelected}}>
            <div className="horizontalContainer mainContent">
                {edificios && <SideBar edificios={edificios}></SideBar>}
                <div className="panelCentral horizontalContainer">
                    <div className="verticalContainer columnaIzquierdaDashboard">
                        {selected && <ConsumoActual selected={selected}></ConsumoActual>}
                        {selected && <TablaConsumo rows={rows}></TablaConsumo>}
                    </div>
                    <div className="verticalContainer columnaDerechaDashboard">
                        {selected && <GraficoConsumo rows={rows}></GraficoConsumo>}
                        <Filtros setFechaRange={setFechaRange} setConsumoRange={setConsumoRange} consumoRange={consumoRange} fechaRange={fechaRange}></Filtros>
                    </div>
                </div>
            </div>
        </EdificioContextDashboard.Provider>
    );
};

export default Dashboard;
