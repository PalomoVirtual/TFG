import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";

export const EdificioContextEdificios = React.createContext();

const Edificios = () =>{
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
        <EdificioContextEdificios.Provider value={{selected, setSelected}}>
            <div className="horizontalContainer mainContent">
                {edificios && <SideBar edificios={edificios}></SideBar>}
                <div className="panelCentral"></div>
            </div>
        </EdificioContextEdificios.Provider>
    );
};

export default Edificios;