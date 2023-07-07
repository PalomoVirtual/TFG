import React, { useState, useRef, useMemo } from 'react';
import { List, AutoSizer } from 'react-virtualized';
import PropTypes from 'prop-types';
import './styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

const TablaConsumoMultiple = ({rows}) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const listRef = useRef();

  // function formatDate(dateString) {
  //   let [time, date] = dateString.split(" ");
  //   let [day, month, year] = date.split("/");
  //   return `${year}-${month}-${day} ${time}`;
  // }

  function binarySearch(array, target) {
    let left = 0;
    let right = array.length - 1;
    
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        
        // console.log(mid + " --- " + array[mid].date);
        if (array[mid].date == target) {
            return array[mid];
        } else if (array[mid].date < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return null;
}

  // const uniqueSet = new Set();
  // // Este Map almacenará las duplicaciones del primer array
  // const duplicateMap = new Map();

  // // Obtenemos el primer array
  // const firstArray = rows.values().next().value;

  // if(firstArray != undefined){
  //   // Iteramos sobre cada elemento en el primer array
  //   firstArray.forEach((obj) => {
  //     if (uniqueSet.has(obj.date)) {
  //       // Si ya hemos visto este elemento, es una duplicación
  //       // Aquí podríamos incrementar un contador para ese elemento duplicado
  //       duplicateMap.set(obj.date, (duplicateMap.get(obj.date) || 0) + 1);
  //     } else {
  //       // Si no hemos visto este elemento, lo añadimos al Set
  //       uniqueSet.add(obj.date);
  //     }
  //   });
  
  //   console.log(Array.from(duplicateMap.entries()));
  // }

  // if (rows.size > 0) {
  //   const firstArray = rows.values().next().value;
  //   const arraySize = firstArray.length;
  //   console.log("rows size --- " + arraySize);
  // }
  const handleScroll = ({ scrollTop }) => {
    setScrollPosition(scrollTop);
  };


  const chartData = useMemo(() => {
    console.log("Se ejecuta memo");
    let newChartData = [];
  
  
      let dateSet = new Set();
      for (let array of rows.values()) {
          for (let obj of array) {
              dateSet.add(obj.date);
          }
      }
    
      let dateArray = Array.from(dateSet).sort((a, b) => {
          let [dateA, timeA] = a.split(" ");
          let [dateB, timeB] = b.split(" ");
      
          let [yearA, monthA, dayA] = dateA.split("-");
          let [yearB, monthB, dayB] = dateB.split("-");
      
          let dateObjA = new Date(yearA, monthA - 1, dayA);
          let dateObjB = new Date(yearB, monthB - 1, dayB);
      
          let dateComparison = dateObjA - dateObjB;
    
          if (dateComparison === 0) { 
              return timeA.localeCompare(timeB);
          } else {
              return dateComparison;
          }
      });
    
      for (let date of dateArray) {
          let row = [date];
          for (let array of rows.values()) {
              let obj = binarySearch(array, date);
              row.push(obj ? obj.value : null);
          }
          newChartData.push(row);
      }
    return newChartData;
  }, [rows]);

  const rowRenderer = ({ index, key, style }) => {
    let consumoClase = [];
    for(let i=1; i<chartData[0].length; i++){
      consumoClase = consumoClase.concat('');
      console.log("Preparando " + i + " de consumoClase")
    }
  
    if (index < chartData.length - 1) {
      for(let i=1; i<chartData[chartData.length-1-index].length; i++){
        console.log(chartData[chartData.length-1-index]);
        let diferencia;
        if(chartData[chartData.length-1-index][i] != null && chartData[chartData.length-2-index][i] != null){
          diferencia = chartData[chartData.length-1-index][i] - chartData[chartData.length-2-index][i];
        }
        else{
          diferencia = 0;
        }
        if (diferencia > 0) {
          consumoClase[i-1] = 'valorConsumoIncrementado';
        } else if (diferencia < 0) {
          consumoClase[i-1] = 'valorConsumoDecrementado';
        } else {
          consumoClase[i-1] = 'valorConsumoIgual';
        }
      }
    }

    return (
      <div key={key} style={style} className='horizontalContainer filaTablaConsumo'>
        <div className='fechaConsumoMultiple'>{chartData[chartData.length-1-index][0]}</div>
        <div className='horizontalContainer filaTablaMultiple'>
          {Array.from({length: chartData[chartData.length-1-index].length-1}, (_, i) => (
            <div className={"valorConsumo " + consumoClase[i]} key={i}>
                {chartData[chartData.length-1-index][i+1]} { consumoClase[i] == 'valorConsumoIncrementado' ? <FontAwesomeIcon icon={faSortUp}></FontAwesomeIcon> : consumoClase[i] == 'valorConsumoDecrementado' ? <FontAwesomeIcon icon={faSortDown}></FontAwesomeIcon> : <></>}
            </div>
          ))}
        </div>

      </div>
    );
  };

  return (
    <div className='marcoTablaConsumo verticalContainer'>
      <div className='tituloTablaConsumo'>Tabla de consumo (kWh)</div>
      {chartData.length > 0 ? <AutoSizer>
        {({height, width }) => (
          <List
            className='listaConsumo'
            ref={listRef}
            onScroll={handleScroll}
            scrollTop={scrollPosition}
            width={width}
            height={height}
            rowCount={chartData.length}
            rowHeight={40}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer> : "Vacío"}
    </div>
  );
};

TablaConsumoMultiple.propTypes = {
  rows: PropTypes.instanceOf(Map)
};

export default TablaConsumoMultiple;