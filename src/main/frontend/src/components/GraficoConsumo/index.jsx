import React from "react";
import "./styles.css";
import PropTypes from 'prop-types';

const GraficoConsumo = ({selected}) =>{
    console.log(selected);


    return(
        <div className="verticalContainer marcoGraficoConsumo">
            <div>Gráfico de consumo</div>
            <div>

            </div>
        </div>
    );
};

GraficoConsumo.propTypes = {
    selected: PropTypes.number
};

export default GraficoConsumo;