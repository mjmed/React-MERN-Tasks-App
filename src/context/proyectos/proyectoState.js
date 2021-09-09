import React, { useReducer } from 'react';
import { v4 as uuidv4 } from 'uuid';

import proyectoContext from './proyectoContext';
import proyectoReducer from './proyectoReducer';
import {
    FORMULARIO_PROYECTO,
    OBTENER_PROYECTOS,
    AGREGAR_PROYECTO,
    VALIDAR_FORMULARIO,
    PROYECTO_ACTUAL,
    ELIMINAR_PROYECTO,
} from '../../types';


const ProyectoState = props => {

    const proyectos = [
        { id: 1, nombre: 'Tienda virtual' },
        { id: 2, nombre: 'Intranet' },
        { id: 3, nombre: 'Diseño de sitio web' },
        { id: 4, nombre: 'MERN' },
    ];

    const initialState = {
        proyectos: [],
        formulario: false,
        errorFormulario: false,
        proyecto: null,
    }

    // Dispatch para ejecutar las acciones
    const [ state, dispatch ] = useReducer( proyectoReducer, initialState );

    // Serie de funciones para el crud
    // mostrar el formulario NuevoProyecto
    const mostrarFormulario = () => {

        dispatch({
            type: FORMULARIO_PROYECTO
        })
    }

    // obtener proyectos
    const obtenerProyectos = () => {

        dispatch({
            type: OBTENER_PROYECTOS,
            payload: proyectos
        });
    }

    // agregar nuevo proyecto
    const agregarProyecto = proyecto => {

        proyecto.id = uuidv4();

        dispatch({
            type: AGREGAR_PROYECTO,
            payload: proyecto
        });
    }

    // validar formulario por errores
    const mostrarError = () => {

        dispatch({
            type: VALIDAR_FORMULARIO
        });
    }

    // activa el proyecto que el usuario seleccionó
    const proyectoActual = proyectoId => {

        dispatch({
            type: PROYECTO_ACTUAL,
            payload: proyectoId
        });
    }

    // eliminar un proyecto
    const eliminarProyecto = proyectoId => {

        dispatch({
            type: ELIMINAR_PROYECTO,
            payload: proyectoId
        });
    }

    return (
        <proyectoContext.Provider
            value={{
                proyectos: state.proyectos,
                formulario: state.formulario,
                errorFormulario: state.errorFormulario,
                proyecto: state.proyecto,
                mostrarFormulario,
                obtenerProyectos,
                agregarProyecto,
                mostrarError,
                proyectoActual,
                eliminarProyecto,
            }}
        >
            { props.children }
        </proyectoContext.Provider>
    )
}

export default ProyectoState;
