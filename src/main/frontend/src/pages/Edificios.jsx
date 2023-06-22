import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import EdificioFormFrame from "../components/EdificioFormFrame";

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

    if (edificios === null || edificios === undefined || selected === null || selected === undefined) {
        return <div></div>;
    }
    let edificio = edificios.find(i => i.id === selected);
    return(
        <EdificioContextEdificios.Provider value={{selected, setSelected}}>
            <div className="horizontalContainer mainContent">
                {edificios && <SideBar edificios={edificios}></SideBar>}
                <div className="panelCentral verticalContainer panelEdificios">
                    <EdificioFormFrame selected={selected} edificioName={edificio === undefined ? "" : edificio.name} edificioAddress={edificio === undefined ? "" : edificio.address} edificioPhone={edificio === undefined ? "" : edificio.phoneNumber} edificioComment={edificio === undefined ? "" : edificio.additionalComment} ></EdificioFormFrame>
                </div>
            </div>
        </EdificioContextEdificios.Provider>
    );
};

export default Edificios;