import React, { useContext } from "react";
import './styles.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation } from "wouter";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import EdificioSideBar from "../EdificioSideBar";
import PropTypes from 'prop-types';
import { EdificioContextDashboard } from '../../pages/Dashboard';
import { EdificioContextEdificios } from "../../pages/Edificios";
import { EdificioContextNotificaciones } from "../../pages/Notificaciones";

const SideBar = ({edificios}) => {
    const [location, ] = useLocation();
    let context;
    switch (location){
        case '/':
            context = EdificioContextDashboard;
            break;
        case '/edificios':
            context = EdificioContextEdificios;
            break;
        case '/notificaciones':
            context = EdificioContextNotificaciones;
            break;
    }

    const { selected, setSelected } = useContext(context);
    
    return (
    <div className="verticalContainer sideBar">
        <div className={location === '/edificios' ? 'horizontalContainer nuevoEdificio' : 'displayNone'} onClick={() => setSelected(-1)}>
            <FontAwesomeIcon className="nuevoEdificioIcon" icon={faPlus} />
            <div>Nuevo edificio</div>
        </div>
        <div className="edificios verticalContainer">
            {edificios.map((edificio) => (
                <EdificioSideBar name={edificio.name} key={edificio.id} isSelected={edificio.id === selected} onSelected={() => setSelected(edificio.id)}></EdificioSideBar>
            ))}
        </div>
    </div>
    );
  };
  
  SideBar.propTypes = {
    edificios: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
  export default SideBar;