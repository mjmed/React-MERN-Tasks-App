import React, { Fragment, useContext } from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import { Tarea } from './Tarea';


export const ListadoTareas = () => {

    const { proyecto, eliminarProyecto } = useContext( proyectoContext );

    if ( !proyecto ) return <h2>Selecciona un proyecto</h2>;

    // array destructuring
    const [ proyectoActual ] = proyecto;

    const tareasProyecto = [
        { id: 1, nombre:'Elegir Plataforma', estado: true },
        { id: 2, nombre:'Elegir colores', estado: false },
        { id: 3, nombre:'Elegir Plataforma de Pago', estado: false },
        { id: 4, nombre:'Elegir Hosting', estado: true },
    ];

    const handleEliminar = () => {

        eliminarProyecto( proyectoActual.id );
    }

    return (
        <Fragment>
            <h2>Proyecto: { proyectoActual.nombre }</h2>

            <ul className="listado-tareas">
                {
                    (tareasProyecto.length === 0)
                        ? ( <li className="tarea">No hay tareas</li> )
                        : (
                            tareasProyecto.map( tarea => (
                                <Tarea key={ tarea.id } tarea={ tarea } />
                            ))
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
