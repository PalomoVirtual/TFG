import React, { useState } from "react";
import "./styles.css";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { DateRangePicker, RangeSlider } from "rsuite";
import 'rsuite/dist/rsuite-no-reset.min.css';

const Filtros = ({setFechaRange, setConsumoRange, consumoRange, fechaRange}) => {
    const [consumoRangeSliding, setConsumoRangeSliding] = useState(consumoRange);
    const [fechaRangeChanging, setFechaRangeChanging] = useState(fechaRange);

    function clearFilters(){
        setFechaRange(null);
        setConsumoRange([0, 1000]);
        setConsumoRangeSliding([0, 1000]);
        setFechaRangeChanging(null);
    }
    
    function handleFechaChange(value){
        setFechaRange(value);
        setFechaRangeChanging(value);
    }


    return(
        <div className="verticalContainer marcoFiltros">
            <div>Filtros</div>
            <div className="horizontalContainer mainContainerFiltro">
                <div className="verticalContainer rangeContainer">
                    <div className="rangeTitle">Intervalo temporal</div>
                    <DateRangePicker value={fechaRangeChanging} placement="topStart" format="yyyy-MM-dd HH:mm:ss" block={true} cleanable={true} onChange={handleFechaChange}/>
                </div>
                <div className="verticalContainer">
                    {/* <FontAwesomeIcon icon={faFilter}></FontAwesomeIcon> */}
                    <FontAwesomeIcon onClick={clearFilters} className="iconContainer" icon={faFilterCircleXmark}></FontAwesomeIcon>
                </div>
                <div className="verticalContainer rangeContainer">
                    <div className="rangeTitle">Intervalo de consumo (kWh)</div>
                    <RangeSlider defaultValue={consumoRange} value={consumoRangeSliding} progress={true} min={0} max={1000} onChange={(value) => {setConsumoRangeSliding(value)}} onChangeCommitted={(value => {setConsumoRange(value)})}></RangeSlider>
                    <div className="horizontalContainer containerConsumoBoxes">
                        <div className="intervaloConsumoBox">{consumoRange[0].toString()}</div>
                        <div className="intervaloConsumoBox">{consumoRange[1].toString()}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

Filtros.propTypes = {
    setFechaRange: PropTypes.func,
    setConsumoRange: PropTypes.func,
    consumoRange: PropTypes.array,
    fechaRange: PropTypes.array,
};

export default Filtros;