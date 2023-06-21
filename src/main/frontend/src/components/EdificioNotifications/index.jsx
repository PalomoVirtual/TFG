import React, { useState } from "react";
import './styles.css';
import Switch from "react-switch";

const EdificioNotifications = () => {
    const [checked, setChecked] = useState(false);

    function handleChange(){
        setChecked(!checked);
    }

    return(
        <div className="verticalContainer marcoNotifications">
            <div className="tituloMarco">Notificaciones de edificio</div>
            <form id="formNotifications" className="verticalContainer">
                <div className="horizontalContainer conjuntoInputIndividual">
                    <input form="formNotifications" className="inputNotificaciones" placeholder="Valor máximo"></input>
                    <div className="parteDerechaInput verticalContainer">kWh</div>
                </div>
                <div className="horizontalContainer">
                    <input className="inputNotificaciones" placeholder="Correo electronico para las notificiones"></input>
                    <div className="parteDerechaInput verticalContainer"></div>
                </div>
            </form>
            <div className="horizontalContainer buttonsNotifications">
                <div className="toggleNotifications">

                    <Switch onChange={handleChange} height={54} width={120} handleDiameter={45} offHandleColor="#D9D9D9" onColor="#00AEF0" checkedIcon={false} uncheckedIcon={false}checked={checked} />
                </div>
                <input className="buttonConfirmar" type="submit" form="formNotifications" value="Confirmar"></input>
            </div>
        </div>
    );
};

export default EdificioNotifications;