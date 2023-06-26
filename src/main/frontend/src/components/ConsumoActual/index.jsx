import React, { useEffect, useState } from "react";
import './styles.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const ConsumoActual = ({selected}) =>{
    const [consumoActualAnterior, setConsumoActualAnterior] = useState([]);
    const [claseLogo, setClaseLogo] = useState("");
    const [claseConsumo, setClaseConsumo] = useState("");
    const [dif, setDif] = useState(0);
    
    const updateConsumoData = (data) => {
        setConsumoActualAnterior(data);
            if(data[1] != -1){
                let diferencia = data[0] - data[1];
                setDif(diferencia);
                if(diferencia == 0){
                    setClaseLogo("displayNone");
                }
                else{
                    let clase;
                    if(diferencia > 0){
                        clase = "incremento";
                        setClaseLogo(clase);
                    }
                    else{
                        clase = "decremento";
                        setClaseLogo(clase);
                    }
                    setClaseConsumo(clase);
                }
            }
            else{
                setClaseLogo("displayNone");
                setClaseConsumo("")
            }
    }

    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
        const stompClient = Stomp.over(socket);

        fetch('http://localhost:8080/api/history/' + selected.toString() + "/current")
        .then(response => response.json())
        .then(data => {
            updateConsumoData(data);
            
            stompClient.connect({}, () => {
                stompClient.subscribe('/topic/update', (message) => {
                    const receivedData = JSON.parse(message.body);
                    if (receivedData.buildingId === selected) {
                        fetch('http://localhost:8080/api/history/' + selected.toString() + "/current")
                        .then(response => response.json())
                        .then(data => {
                            updateConsumoData(data);
                        });
                    }
                });
            });
    
            return () => {
                if (stompClient) {
                    stompClient.disconnect();
                }
            };

        });
    }, [selected]);

    return(
        <div className="marcoConsumoActual verticalContainer">
            <div>Consumo actual (kWh)</div>
            {consumoActualAnterior.length > 0 && <div className="horizontalContainer horizontalCenter consumoBloque">
                {consumoActualAnterior[0] != -1 && <div className={"consumoActual " + claseConsumo}>{consumoActualAnterior[0]}</div>}
                {dif != 0 && claseLogo != "" && <div className={claseLogo}>{ dif > 0 ? <FontAwesomeIcon className="icono" icon={faSortUp}></FontAwesomeIcon> : <FontAwesomeIcon className="icono" icon={faSortDown}></FontAwesomeIcon>} </div>}
            </div>}
        </div>
    );
};

ConsumoActual.propTypes = {
    selected: PropTypes.number
};

export default ConsumoActual;