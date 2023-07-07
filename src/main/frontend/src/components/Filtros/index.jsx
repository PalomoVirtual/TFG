import React, { useEffect, useState } from "react";
import "./styles.css";
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilterCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { DateRangePicker, RangeSlider } from "rsuite";
import 'rsuite/dist/rsuite-no-reset.min.css';

const Filtros = ({setFechaRange, setConsumoRange, consumoRange, fechaRange, consumoMinMax}) => {
    const [consumoRangeSliding, setConsumoRangeSliding] = useState(consumoMinMax);
    const [fechaRangeChanging, setFechaRangeChanging] = useState(fechaRange);


    useEffect(() => {
        setConsumoRangeSliding(consumoMinMax);
    }, [consumoMinMax]);

    function clearFilters(){
        setFechaRange(null);
        setConsumoRange([-1, -1]);
        setConsumoRangeSliding([consumoMinMax[0], consumoMinMax[1]]);
        setFechaRangeChanging(null);
    }
    
    function handleFechaChange(value){
        setFechaRange(value);
        setFechaRangeChanging(value);
    }

    const defaultSlider = [0, 1000];

    if(consumoRange[0] == -1){
        defaultSlider[0] = consumoMinMax[0];
    }
    else{
        defaultSlider[0] = consumoRange[0];
    }

    if(consumoRange[1] == -1){
        defaultSlider[1] = consumoMinMax[1];
    }
    else{
        defaultSlider[1] = consumoRange[1];
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
                    <RangeSlider defaultValue={defaultSlider} value={consumoRangeSliding} progress={true} min={consumoMinMax[0]} max={consumoMinMax[1]} onChange={(value) => {setConsumoRangeSliding(value)}} onChangeCommitted={(value => {setConsumoRange(value)})}></RangeSlider>
                    <div className="horizontalContainer containerConsumoBoxes">
                        <div className="intervaloConsumoBox">{consumoRangeSliding[0].toString()}</div>
                        <div className="intervaloConsumoBox">{consumoRangeSliding[1].toString()}</div>
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
    consumoMinMax: PropTypes.array
};

export default Filtros;