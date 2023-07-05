import React, { useState } from "react";
import "./styles.css";
import PropTypes from 'prop-types';
import { SelectPicker } from "rsuite";
import 'rsuite/dist/rsuite-no-reset.min.css';
import Chart from "react-google-charts";

const GraficoConsumoMultiple = ({rows}) =>{
    const [tipoGrafico, setTipoGrafico] = useState("LineChart");


    let rowsDownSample = rows;
    if(rows.length > 200){
        let step = Math.floor(rows.length / 200);
        rowsDownSample = rows.filter((_, index) => index % step === 0);
    }

    
    const opcionesGrafico = React.useMemo(() => {
        switch (tipoGrafico) {
            case 'ColumnChart':
                return {
                    animation: {
                        startup: true,
                        duration: 1000
                    },
                    backgroundColor: { fill: 'white', stroke: "#000000", strokeWidth: 5},
                    axisTitlesPosition: "none",
                    legend: {position: "none"},
                    chartArea: {width: "80%", left: "15%"},
                    explorer: {actions: ['dragToPan', 'rightClickToReset'], axis: "horizontal"},
                    hAxis: {slantedText: true, maxTextLines: 1, showTextEvery: 20},
                    selectionMode: "multiple",
                };
            case 'LineChart':
                return {
                        animation: {
                            startup: true,
                            duration: 1000
                        },
                        backgroundColor: { fill: 'white', stroke: "#000000", strokeWidth: 5},
                        axisTitlesPosition: "none",
                        legend: {position: "none"},
                        chartArea: {width: "80%", left: "15%"},
                        explorer: {actions: ['dragToPan', 'rightClickToReset'], axis: "horizontal"},
                        hAxis: {slantedText: true, maxTextLines: 1, showTextEvery: 20},
                        selectionMode: "multiple"
                };
            case 'ScatterChart':
            return {
                animation: {
                    startup: true,
                    duration: 1000
                },
                backgroundColor: { fill: 'white', stroke: "#000000", strokeWidth: 5},
                axisTitlesPosition: "none",
                legend: {position: "none"},
                chartArea: {width: "80%", left: "15%"},
                explorer: {actions: ['dragToPan', 'rightClickToReset'], axis: "horizontal"},
                hAxis: {slantedText: true, maxTextLines: 1, showTextEvery: 20},
                selectionMode: "multiple"
            };
        }
      }, [tipoGrafico]);
    const data = [
        { label: 'Barras', value: 'ColumnChart' },
        { label: 'Líneas', value: 'LineChart' },
        { label: 'Dispersión', value: 'ScatterChart' },
        // { label: 'Velas', value: 'CandlestickChart' }
    ];

    let rowsFormatted = rowsDownSample.map(row => [row.date, row.value]);
    let rowsFinal = [["Fecha", "Consumo (kWh)"]].concat(rowsFormatted);
    console.log(rowsFinal.length);

    
    return(
        <div className="verticalContainer marcoGraficoConsumo">
            <div className="tituloGraficoConsumo">Gráfico de consumo (kWh)</div>
            <div className="horizontalContainer mainGraficoContainer">
                <div>
                    <SelectPicker className="selectPicker" defaultValue='LineChart' onChange={(value) => {setTipoGrafico(value)}} data={data} cleanable={false} block={true} searchable={false} preventOverflow={true} menuStyle={{ width: 224, fontFamily: "Montserrat", fontSize: "24px", marginTop: "10px" }}/>
                </div>
                <div className="verticalContainer grafico">
                    {rows.length > 0 && <Chart chartType={tipoGrafico} height={"100%"} data={rowsFinal} options={opcionesGrafico}></Chart>}
                </div>

            </div>
        </div>
    );
};

GraficoConsumoMultiple.propTypes = {
    rows: PropTypes.array
};

export default GraficoConsumoMultiple;