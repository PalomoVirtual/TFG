import React from "react";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css'
import PropTypes from 'prop-types';


const EdificioSideBar = ({name, isSelected, onSelected}) => {
    //const [location, ] = useLocation();
    
    return(
        <div className="horizontalContainer edificio" onClick={onSelected}>
            <FontAwesomeIcon icon={faBuilding} className={isSelected ? 'edificioIconSelected' : 'edificioIcon'}></FontAwesomeIcon>
            <div className={isSelected ? 'edificioNameSelected' : 'edificioName'}>{name}</div>
        </div>
    );
};

EdificioSideBar.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelected: PropTypes.func.isRequired,
};

export default EdificioSideBar;