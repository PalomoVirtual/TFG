import React from "react";
import { faBuilding } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './styles.css'
import PropTypes from 'prop-types';


const EdificioSideBarMultiple = ({name, isSelected, onSelected, onDeselected, index}) => {
    //const [location, ] = useLocation();
    
    return(
        <div className="horizontalContainer edificio" onClick={isSelected ? onDeselected : onSelected}>
            <FontAwesomeIcon icon={faBuilding} className={isSelected ? 'edificioIconSelected' : 'edificioIcon'}></FontAwesomeIcon>
            <div className="horizontalContainer growContainer">
                <div className={isSelected ? 'edificioNameSelected nombreEdificioMultiple' : 'edificioName'}>{name}</div>
                {index != -1 && <div className="indexEdificio">{"(" + (index+1) + ")"}</div>}
                {/* {"Hola" + index} */}
            </div>
        </div>
    );
};

EdificioSideBarMultiple.propTypes = {
  name: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onSelected: PropTypes.func.isRequired,
  onDeselected: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default EdificioSideBarMultiple;