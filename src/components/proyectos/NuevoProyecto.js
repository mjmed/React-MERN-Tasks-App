import React, { Fragment, useContext, useState } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';


export const NuevoProyecto = () => {

    // Obtener el state del formulario
    const proyectosContext = useContext( proyectoContext );
    const {
        formulario,
        errorFormulario,
        mostrarFormulario,
        agregarProyecto,
        mostrarError
    } = proyectosContext;

    const [ proyecto, guardarProyecto ] = useState({
        nombre: ''
    });

    const { nombre } = proyecto;

    const handleInputChange = ({target }) => {

        guardarProyecto({
            ...proyecto,
            [target.name]: target.value
        });
    }

    const handleSubmit = ( e ) => {

        e.preventDefault();

        // validación
        if ( nombre === '' ) {
            mostrarError();
            return;
        }

        // agregar al state
        agregarProyecto( proyecto );

        // reiniciar el form
        guardarProyecto({
            nombre: ''
        });
    }

    return (
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ () => mostrarFormulario() }
            >
                Nuevo proyecto
            </button>

            {
                ( formulario )
                    ? (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={ handleSubmit }
                        >
                            <input
                                type="text"
                                className="input-text"
                                placeholder="Nombre del proyecto"
                                name="nombre"
                                value={ nombre }
                                onChange={ handleInputChange }
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar proyecto"
                            />
                        </form>
                    )
                    : null
            }

            {
                (errorFormulario)
                    ? <p className="mensaje error">El nombre del proyecto es obligatorio</p>
                    : null
            }
        </Fragment>
    )
}
