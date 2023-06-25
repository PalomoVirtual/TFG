import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";

export const EdificioContextComparador = React.createContext();

const Comparador = () =>{
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
        <EdificioContextComparador.Provider value={{selected, setSelected}}>
            <div className="horizontalContainer mainContent">
                {edificios && <SideBar edificios={edificios}></SideBar>}
                <div className="panelCentral"></div>
            </div>
        </EdificioContextComparador.Provider>
    );
};

export default Comparador;