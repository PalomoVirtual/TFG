import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";

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
            <div className="horizontalContainer mainContent">
                <EdificioContextDashboard.Provider value={{selected, setSelected}}>
                    {edificios && <SideBar edificios={edificios}></SideBar>}
                    <div className="panelCentral">
                        
                    </div>
                </EdificioContextDashboard.Provider>
            </div>
    );
};

export default Dashboard;
