import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import { Tarea } from './Tarea';


export const ListadoTareas = () => {

    const { proyecto, eliminarProyecto } = useContext( proyectoContext );
    const { tareasProyecto } = useContext( tareaContext );

    if ( !proyecto ) return <h2>Selecciona un proyecto</h2>;

    // array destructuring
    const [ proyectoActual ] = proyecto;

    const handleEliminar = () => {

        eliminarProyecto( proyectoActual._id );
    }

    return (
        <Fragment>
            <h2>Proyecto: { proyectoActual.nombre }</h2>

            <ul className="listado-tareas">
                {
                    (tareasProyecto.length === 0)
                        ? ( <li className="tarea">No hay tareas</li> )
                        : (
                            <TransitionGroup>
                                {
                                    tareasProyecto.map( tarea => (
                                        <CSSTransition
                                            key={ tarea._id }
                                            timeout={ 200 }
                                            classNames="tarea"
                                        >
                                            <Tarea tarea={ tarea } />
                                        </CSSTransition>
                                    ))
                                }
                            </TransitionGroup>
                        )
                }
            </ul>

            <button
                type="button"
                className="btn btn-eliminar"
                onClick={ handleEliminar }
            >
                Eliminar proyecto &times;
            </button>
        </Fragment>
    )
}
