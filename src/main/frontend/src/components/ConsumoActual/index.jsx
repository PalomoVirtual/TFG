import React from "react";
import './styles.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faSortUp } from "@fortawesome/free-solid-svg-icons";

const ConsumoActual = ({consumoActual, consumoAnterior}) =>{


    let diferencia = consumoActual - consumoAnterior;
    let claseLogo;
    let claseConsumo = "";
    if(diferencia == 0){
        claseLogo = "displayNone";
    }
    else{
        if(diferencia > 0){
            claseLogo = "incremento";
        }
        else{
            claseLogo = "decremento";
        }
        claseConsumo = claseLogo
    }
    return(
        <div className="marcoConsumoActual verticalContainer">
            <div>Consumo actual (kWh)</div>
            <div className="horizontalContainer horizontalCenter consumoBloque">
                <div className={"consumoActual " + claseConsumo}>{consumoActual}</div>
                <div className={claseLogo}>{ diferencia > 0 ? <FontAwesomeIcon icon={faSortUp}></FontAwesomeIcon> : <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon>} </div>
            </div>
        </div>
    );
};

ConsumoActual.propTypes = {
    consumoActual: PropTypes.number,
    consumoAnterior: PropTypes.number,
};

export default ConsumoActual;