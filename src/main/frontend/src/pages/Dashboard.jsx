import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import ConsumoActual from "../components/ConsumoActual";
// import TablaHistorico from "../components/TablaHistorico";
import VirtualizedTable from "../components/pruebaTablaVirtual";

export const EdificioContextDashboard = React.createContext();

const Dashboard = () =>{
    const [edificios, setEdificios] = useState(null);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8080/api/building').then(res => {
            return res.json();
        }).then((data) => {
            setEdificios(data);
            setSelected(data[0].id);
        })   
    }, []);

    return(
        <EdificioContextDashboard.Provider value={{selected, setSelected}}>
            <div className="horizontalContainer mainContent">
                {edificios && <SideBar edificios={edificios}></SideBar>}
                <div className="panelCentral horizontalContainer">
                    <div className="verticalContainer columnaIzquierdaDashboard">
                        <ConsumoActual consumoActual={120.5} consumoAnterior={130}></ConsumoActual>
                        {/* <TablaHistorico></TablaHistorico> */}
                        <VirtualizedTable></VirtualizedTable>
                    </div>
                    <div className="verticalContainer">

                    </div>
                </div>
            </div>
        </EdificioContextDashboard.Provider>
    );
};

export default Dashboard;
