import React, { useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


export const FormTarea = () => {

    // state del formulario
    const [ tarea, guardarTarea ] = useState({
        nombre: '',
    });
    const { nombre } = tarea;

    const { proyecto } = useContext( proyectoContext );
    const {
        tareaSeleccionada,
        errorTarea,
        agregarTarea,
        validarTarea,
        obtenerTareas,
        actualizarTarea,
        limpiarTarea
    } = useContext( tareaContext );

    // detecta si hay una tarea seleccionada
    useEffect(() => {

        if ( tareaSeleccionada !== null ) {
            guardarTarea( tareaSeleccionada );

        } else {
            guardarTarea({
                nombre: ''
            });
        }
        
    }, [ tareaSeleccionada ]);

    // validación proyecto seleccionado
    if ( !proyecto ) return null;

    const [ proyectoActual ] = proyecto;

    const handleInputChange = ({ target }) => {

        guardarTarea({
            ...tarea,
            [target.name]: target.value
        });
    }

    const handleSubmit = e => {

        e.preventDefault();

        // validación
        if ( nombre.trim() === '' ) {
            validarTarea();
            return;
        }

        // revisar si es edición o nueva tarea
        if ( tareaSeleccionada === null ) {

            // agregar la nueva tarea al state
            tarea.id = uuidv4();
            tarea.proyectoId = proyectoActual.id;
            tarea.estado = false;
            agregarTarea( tarea );

        } else {

            // actualizar tarea existente
            actualizarTarea( tarea );

            // elimina tarea seleccionada del state
            limpiarTarea();
        }


        // obtener y filtrar las tareas del proyecto actual
        obtenerTareas( proyectoActual.id );

        // reiniciar form
        guardarTarea({
            nombre: ''
        });
    }

    return (
        <div className="formulario">
            <form onSubmit={ handleSubmit }>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre de la tarea..."
                        name="nombre"
                        value={ nombre }
                        onChange={ handleInputChange }
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={ tareaSeleccionada ? 'Editar tarea' : 'Agregar tarea' }
                    />
                </div>
            </form>

            {
                (errorTarea)
                    ? <p className="mensaje error">El nombre de la tarea es obligatorio</p>
                    : null
            }
        </div>
    )
}
