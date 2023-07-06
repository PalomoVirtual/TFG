import React, { useState } from "react";
import "./styles.css";
import PropTypes from 'prop-types';
import { SelectPicker } from "rsuite";
import 'rsuite/dist/rsuite-no-reset.min.css';
import Chart from "react-google-charts";

const GraficoConsumoMultiple = ({rows}) =>{
    const [tipoGrafico, setTipoGrafico] = useState("LineChart");


    let rowsDownSample = rows;
    rows.forEach((filas, buildingId) => {
        if(filas.length > 200){
            console.log("Mas de 200 --- " + filas + " " + buildingId);
            let step = Math.floor(filas.length / 200);
            rowsDownSample.set(buildingId, filas.filter((_, index) => index % step === 0));
        }
    });

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

    let header = ["Fecha"];
    for(var index=0; index < rowsDownSample.size; index++){
        header = header.concat("Consumo (kWh) - " + (index+1));
        console.log("ejecucion concat header --- " + header);
    }

    // Primero, recogemos todas las fechas en todos los arrays en un Set para eliminar duplicados.
    let dateSet = new Set();
    for (let array of rowsDownSample.values()) {
        for (let obj of array) {
            dateSet.add(obj.date);
        }
    }

    let chartData = [];
    // Convertimos el Set a un Array y lo ordenamos.
    let dateArray = Array.from(dateSet).sort((a, b) => {
        // Separamos la fecha y la hora
        let [timeA, dateA] = a.split(" ");
        let [timeB, dateB] = b.split(" ");
    
        // Desestructuramos la fecha en día, mes y año.
        let [dayA, monthA, yearA] = dateA.split("/");
        let [dayB, monthB, yearB] = dateB.split("/");
    
        // Creamos objetos Date con los valores.
        let dateObjA = new Date(yearA, monthA - 1, dayA);
        let dateObjB = new Date(yearB, monthB - 1, dayB);
    
        let dateComparison = dateObjA - dateObjB;

        if (dateComparison === 0) { // si las fechas son iguales, comparar las horas
            return timeA.localeCompare(timeB);
        } else {
            return dateComparison;
        }
    });

    // Ahora, para cada fecha, recogemos los valores correspondientes de cada array en el mapa.
    // Si un array no tiene un valor para una fecha dada, añadimos null.
    for (let date of dateArray) {
        let row = [date];
        for (let array of rowsDownSample.values()) {
            let obj = array.find(obj => obj.date === date);
            row.push(obj ? obj.value : null);
        }
        chartData.push(row);
    }

    // let rowsFormatted = rowsDownSample.map(row => [row.date, row.value]);
    let rowsFinal = [header].concat(chartData);

    console.log(rowsFinal);
    
    return(
        <div className="verticalContainer marcoGraficoConsumo">
            <div className="tituloGraficoConsumo">Gráfico de consumo (kWh)</div>
            <div className="horizontalContainer mainGraficoContainer">
                <div>
                    <SelectPicker className="selectPicker" defaultValue='LineChart' onChange={(value) => {setTipoGrafico(value)}} data={data} cleanable={false} block={true} searchable={false} preventOverflow={true} menuStyle={{ width: 224, fontFamily: "Montserrat", fontSize: "24px", marginTop: "10px" }}/>
                </div>
                <div className="verticalContainer grafico">
                    {rowsFinal.length > 1 && <Chart chartType={tipoGrafico} height={"100%"} data={rowsFinal} options={opcionesGrafico}></Chart>}
                </div>

            </div>
        </div>
    );
};

GraficoConsumoMultiple.propTypes = {
    rows: PropTypes.instanceOf(Map)
};

export default GraficoConsumoMultiple;