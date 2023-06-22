import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import EdificioNotifications from "../components/EdificioNotifications";

export const EdificioContextNotificaciones = React.createContext();

const Notificaciones = () =>{
    const [edificios, setEdificios] = useState(null);
    const [selected, setSelected] = useState(null);
    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:8080/api/building').then(res => {
            return res.json();
        }).then((data) => {
            setSelected(data[0].id);
            setEdificios(data);
            // setIsLoading(false);
            // console.log(data[0].name);
        })   
    }, []);

    if (edificios === null || edificios === undefined || selected === null || selected === undefined) {
        return <div></div>;
    }
    let edificio = edificios.find(i => i.id === selected);
    return(
        <EdificioContextNotificaciones.Provider value={{selected, setSelected}}>
            <div className="horizontalContainer mainContent">
                {edificios && <SideBar edificios={edificios}></SideBar>}
                <div className="panelCentral verticalContainer panelNotificaciones">
                    <EdificioNotifications selected={selected} notificationValue={edificio.notificationValue} correo={edificio.notificationEmail} notifications={edificio.notifications}></EdificioNotifications>
                </div>
            </div>
        </EdificioContextNotificaciones.Provider>
    );
};

export default Notificaciones;