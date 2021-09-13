import React, { useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


export const Proyecto = ({ proyecto }) => {

    const { proyectoActual } = useContext( proyectoContext );
    const { obtenerTareas } = useContext( tareaContext );

    // agregar el proyecto actual
    const seleccionarProyecto = id => {

        proyectoActual( id );
        obtenerTareas( id );
    }

    return (
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={ () => seleccionarProyecto(proyecto._id) }
            >
                { proyecto.nombre }
            </button>
        </li>
    )
}
