import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import EdificioNotifications from "../components/EdificioNotifications";
// import SideBar from "../components/SideBar";

export const EdificioContextNotificaciones = React.createContext();

const Notificaciones = () =>{
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
        <EdificioContextNotificaciones.Provider value={{selected, setSelected}}>
            <div className="horizontalContainer mainContent">
                {edificios && <SideBar edificios={edificios}></SideBar>}
                <div className="panelCentral verticalContainer panelNotificaciones">
                    <EdificioNotifications></EdificioNotifications>
                </div>
            </div>
        </EdificioContextNotificaciones.Provider>
    );
};

export default Notificaciones;