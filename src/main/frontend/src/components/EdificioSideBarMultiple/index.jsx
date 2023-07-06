import React from "react";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css'
import PropTypes from 'prop-types';


const EdificioSideBarMultiple = ({name, isSelected, onSelected, onDeselected}) => {
    //const [location, ] = useLocation();
    
    return(
        <div className="horizontalContainer edificio" onClick={isSelected ? onDeselected : onSelected}>
            <FontAwesomeIcon icon={faBuilding} className={isSelected ? 'edificioIconSelected' : 'edificioIcon'}></FontAwesomeIcon>
            <div className={isSelected ? 'edificioNameSelected' : 'edificioName'}>{name}</div>
        </div>
    );
};

EdificioSideBarMultiple.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelected: PropTypes.func.isRequired,
  onDeselected: PropTypes.func.isRequired
};

export default EdificioSideBarMultiple;