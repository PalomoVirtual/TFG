import React, { useEffect, useState } from "react";
import './styles.css';
import Switch from "react-switch";
import {  } from "wouter";
import PropTypes from 'prop-types';

const EdificioNotifications = ({selected, notificationValue, correo, notifications}) => {
    const [checked, setChecked] = useState(false);
    const [notifValue, setNotifValue] = useState(notificationValue);
    const [correoValue, setCorreoValue] = useState(correo);

    function handleChange(){
        setChecked(!checked);
    }

    function handleSubmit(){

        fetch('http://localhost:8080/api/building/notifications', {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            method: "PATCH",	
            body: JSON.stringify({
                id: selected,
                notificationValue: notifValue,
                notificationEmail: correoValue,
                notifications: checked
            })
        });
    }

    useEffect(() => {
        setChecked(notifications);
        setNotifValue(notificationValue);
        setCorreoValue(correo);
      }, [notifications, notificationValue, correo]);

    return(
        <div className="verticalContainer marcoNotifications">
            <div className="tituloMarco">Notificaciones de edificio</div>
            <form id="formNotifications" className="verticalContainer">
                <div className="horizontalContainer conjuntoInputIndividual">
                    <input form="formNotifications" type="number" step={0.1} min={0} className="inputNotificaciones" placeholder="Valor máximo" value={notifValue == 0.0 ? "" : notifValue} onChange={(e) => setNotifValue(e.target.value)}></input>
                    <div className="parteDerechaInput verticalContainer">kWh</div>
                </div>
                <div className="horizontalContainer">
                    <input form="formNotifications" type="email" className="inputNotificaciones" placeholder="Correo electronico para las notificiones" value={correoValue} onChange={(e) => setCorreoValue(e.target.value)}></input>
                    <div className="parteDerechaInput verticalContainer"></div>
                </div>
            </form>
            <div className="horizontalContainer buttonsNotifications">
                <div className="toggleNotifications">
                    <Switch onChange={handleChange} height={54} width={120} handleDiameter={45} offHandleColor="#D9D9D9" onColor="#00AEF0" checkedIcon={false} uncheckedIcon={false}checked={checked} />
                </div>
                <input className="buttonConfirmar" type="submit" form="formNotifications" value="Confirmar" onClick={handleSubmit}></input>
            </div>
        </div>
    );

};
EdificioNotifications.propTypes = {
    selected: PropTypes.number,
    notificationValue: PropTypes.number,
    correo: PropTypes.string,
    notifications: PropTypes.bool
  };

export default EdificioNotifications;