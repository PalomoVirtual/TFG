import React, { useEffect, useState } from "react";
import './styles.css';
import {  } from "wouter";
import PropTypes from 'prop-types';

const EdificioFormFrame = ({selected, edificioName, edificioAddress, edificioPhone, edificioComment}) => {
    const [edifName, setEdifName] = useState(edificioName);
    const [edifAddress, setEdifAddress] = useState(edificioAddress);
    const [edifPhone, setEdifPhone] = useState(edificioPhone);
    const [edifComment, setEdifComment] = useState(edificioComment);

    function handleSubmit(){
        if(selected != -1){
            fetch('http://localhost:8080/api/building', {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "PATCH",	
                body: JSON.stringify({
                    id: selected,
                    name: edifName,
                    address: edifAddress,
                    phoneNumber: edifPhone,
                    additionalComment: edifComment
                })
            });
        }
        else{
            fetch('http://localhost:8080/api/building', {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                },
                method: "POST",	
                body: JSON.stringify({
                    name: edifName,
                    address: edifAddress,
                    phoneNumber: edifPhone,
                    additionalComment: edifComment
                })
            });
        }
    }

    function handleDelete(){
        if(selected != -1){
            fetch('http://localhost:8080/api/building/' + selected, {
                method: "DELETE"	
            });
        }
    }

    useEffect(() => {
        setEdifName(edificioName);
        setEdifAddress(edificioAddress);
        setEdifPhone(edificioPhone);
        setEdifComment(edificioComment);
      }, [edificioName, edificioAddress, edificioPhone, edificioComment]);

    return(
        <div className="verticalContainer marcoEdificios">
            <div className="tituloMarco">{selected == -1 ? "Datos de nuevo edificio" : "Datos de edificio"}</div>
            <form id="formEdificios" className="verticalContainer formEdificios">
                <div className="horizontalContainer conjuntoInputIndividualEdificios">
                    <input form="formEdificios" className="inputEdificios" placeholder="Nombre de edificio" value={edifName} onChange={(e) => setEdifName(e.target.value)}></input>
                    <div className="parteDerechaInput verticalContainer"></div>
                </div>
                <div className="horizontalContainer conjuntoInputIndividualEdificios">
                    <textarea form="formEdificios" className="inputEdificios" rows={2} placeholder="Dirección de edificio" value={edifAddress} onChange={(e) => setEdifAddress(e.target.value)}></textarea>
                    <div className="parteDerechaInput verticalContainer"></div>
                </div>
                <div className="horizontalContainer conjuntoInputIndividualEdificios">
                    <input form="formEdificios" className="inputEdificios" placeholder="Número de teléfono" value={edifPhone} onChange={(e) => setEdifPhone(e.target.value)}></input>
                    <div className="parteDerechaInput verticalContainer"></div>
                </div>
                <div className="horizontalContainer">
                    <textarea form="formEdificios" className="inputEdificios" rows={8} placeholder="Comentario adicional" value={edifComment} onChange={(e) => setEdifComment(e.target.value)}></textarea>
                    <div className="parteDerechaInput verticalContainer"></div>
                </div>
            </form>
            <div className="horizontalContainer buttonsEdificios">
                <input className="buttonSubmit" type="submit" form="formEdificios" value="Confirmar" onClick={handleSubmit}></input>
                <input className="buttonSubmit" type="submit" form="formEdificios" value="Eliminar" onClick={handleDelete}></input>
            </div>
        </div>
    );

};
EdificioFormFrame.propTypes = {
    selected: PropTypes.number,
    edificioName: PropTypes.string,
    edificioAddress: PropTypes.string,
    edificioPhone: PropTypes.string,
    edificioComment: PropTypes.string
  };

export default EdificioFormFrame;