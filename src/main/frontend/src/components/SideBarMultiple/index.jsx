import React, { useContext } from "react";
import './styles.css'
import PropTypes from 'prop-types';
import { EdificioContextComparador } from "../../pages/Comparador";
import EdificioSideBarMultiple from "../EdificioSideBarMultiple";

const SideBarMultiple = ({edificios}) => {
    const { selected, setSelected } = useContext(EdificioContextComparador);
    
    return (
    <div className="verticalContainer sideBar">
        <div className="edificios verticalContainer">
            {edificios.map((edificio) => (
                <EdificioSideBarMultiple name={edificio.name} key={edificio.id} isSelected={edificio.id === selected} onSelected={() => setSelected(edificio.id)}></EdificioSideBarMultiple>
            ))}
        </div>
    </div>
    );
  };
  
  SideBarMultiple.propTypes = {
    edificios: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
  };
  
  export default SideBarMultiple;