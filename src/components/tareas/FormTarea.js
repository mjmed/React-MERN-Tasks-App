import React, { useContext } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';


export const FormTarea = () => {

    const { proyecto } = useContext( proyectoContext );

    // validación proyecto seleccionado
    if ( !proyecto ) return null;

    // const [ proyectoActual ] = proyecto;

    return (
        <div className="formulario">
            <form>
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Nombre tarea..."
                        name="nombre"
                    />
                </div>

                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value="Agregar tarea"
                    />
                </div>
            </form>
        </div>
    )
}
