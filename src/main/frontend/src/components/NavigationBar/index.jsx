import React from "react";
import './styles.css'
import logo from '../../assets/logo.png';
import { useLocation } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";

const NavigationBar = () => {
    const [location, updateLocation] = useLocation();
    
    function handleNotificationClick(){
        updateLocation('/notificaciones');
    }
    
    return (
        <div className="horizontalContainer">
            <div className="navbar horizontalContainer">
                <div className="horizontalContainer">
                    <div className="logoContainer">
                        <img src={logo}></img>
                    </div>
                    <div className="verticalContainer justifyCenter">
                        <div className="brandVerticalLine"></div>
                    </div>
                    <div className="brandName verticalContainer">
                        <div className="brandNameUp">Powerglimpse</div>
                        <div className="brandNameDown">Energy monitoring</div>
                    </div>
                </div>


                <div className="navButtons horizontalContainer">
                    <div className="navButton verticalContainer" onClick={() => updateLocation('/')} style={{cursor: 'pointer'}}>
                        <div className={location === '/' ? 'selectedIndicator' : ''}></div>
                        <div className={location === '/' ? 'bold navButtonName' : 'navButtonName'}>Dashboard</div>
                    </div>
                    <div className="navButton verticalContainer" onClick={() => updateLocation('/edificios')} style={{cursor: 'pointer'}}> 
                        <div className={location === '/edificios' ? 'selectedIndicator' : ''}></div>
                        <div className={location === '/edificios' ? 'bold navButtonName' : 'navButtonName'}>Edificios</div>
                    </div>
                    <div className="navButton verticalContainer" onClick={() => updateLocation('/comparador')} style={{cursor: 'pointer'}}>
                        <div className={location === '/comparador' ? 'selectedIndicator' : ''}></div>
                        <div className={location === '/comparador' ? 'bold navButtonName' : 'navButtonName'}>Comparador</div>
                    </div>
                </div>


                <div className="notifications verticalContainer" onClick={handleNotificationClick} style={{cursor: 'pointer'}}>
                    <FontAwesomeIcon className={location === '/notificaciones' ? 'notificationsIcon notificationsIconSelected' : 'notificationsIcon'} icon={faBell} />
                </div>

            </div>
        </div>
    );
  };
  
  export default NavigationBar;