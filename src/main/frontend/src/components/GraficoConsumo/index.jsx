import React from "react";
import "./styles.css";
import PropTypes from 'prop-types';
import { SelectPicker } from "rsuite";
import 'rsuite/dist/rsuite-no-reset.min.css';
import Chart from "react-google-charts";

const GraficoConsumo = ({rows}) =>{
    // google.charts.setOnLoadCallback(drawChart);

    const data = [
        'Barras',
        'Líneas',
        'Sectores',
        'Tendencia',
        'Velas'
    ].map(item => ({ label: item, value: item }));

    let rowsFormatted = rows.map(row => [row.date, row.value]);
    let rowsFinal = [["Fecha", "Consumo (kWh)"]].concat(rowsFormatted);
    console.log(rowsFinal);
    return(
        <div className="verticalContainer marcoGraficoConsumo">
            <div className="tituloGraficoConsumo">Gráfico de consumo</div>
            <div className="horizontalContainer mainGraficoContainer">
                <div>
                    <SelectPicker className="selectPicker" defaultValue="Líneas" data={data} cleanable={false} block={true} searchable={false} preventOverflow={true} menuStyle={{ width: 224, fontFamily: "Montserrat", fontSize: "24px", marginTop: "10px" }}/>
                </div>
                <div className="verticalContainer grafico">
                    <Chart chartType="LineChart" height={"100%"} data={rowsFinal}></Chart>
                </div>

            </div>
        </div>
    );
};

GraficoConsumo.propTypes = {
    rows: PropTypes.array
};

export default GraficoConsumo;