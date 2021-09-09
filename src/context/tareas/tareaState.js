import React, { useReducer } from 'react';

import TareaContext from './tareaContext';
import TareaReducer from './tareaReducer';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA,
} from '../../types';


const TareaState = props => {

    const initialState = {
        tareas: [
            { id: 1, nombre:'Elegir Plataforma', estado: true, proyectoId: 1 },
            { id: 2, nombre:'Elegir colores', estado: false, proyectoId: 2 },
            { id: 3, nombre:'Elegir Plataforma de Pago', estado: false, proyectoId: 3 },
            { id: 4, nombre:'Elegir Hosting', estado: true, proyectoId: 4 },
            { id: 5, nombre:'Elegir Plataforma', estado: true, proyectoId: 2 },
            { id: 6, nombre:'Elegir colores', estado: false, proyectoId: 4 },
            { id: 7, nombre:'Elegir Plataforma de Pago', estado: false, proyectoId: 1 },
            { id: 8, nombre:'Elegir Hosting', estado: true, proyectoId: 3 },
            { id: 9, nombre:'Elegir Plataforma', estado: true, proyectoId: 3 },
            { id: 10, nombre:'Elegir colores', estado: false, proyectoId: 1 },
            { id: 11, nombre:'Elegir Plataforma de Pago', estado: false, proyectoId: 4 },
            { id: 12, nombre:'Elegir Hosting', estado: true, proyectoId: 2 },
        ],
        tareasProyecto: null,
        errorTarea: false,
        tareaSeleccionada: null
    }

    const [ state, dispatch ] = useReducer( TareaReducer, initialState );

    // obtener las tareas de un proyecto
    const obtenerTareas = proyectoId => {

        dispatch({
            type: TAREAS_PROYECTO,
            payload: proyectoId
        });
    }

    // agregar una tarea al proyecto seleccionado
    const agregarTarea = tarea => {

        dispatch({
            type: AGREGAR_TAREA,
            payload: tarea
        });
    }

    // valida y muestra un error
    const validarTarea = () => {

        dispatch({ type: VALIDAR_TAREA });
    }

    // eliminar tarea por id
    const eliminarTarea = id => {

        dispatch({
            type: ELIMINAR_TAREA,
            payload: id
        });
    }

    // cambiar el estado de una tarea
    const cambiarEstadoTarea = tarea => {

        dispatch({
            type: ESTADO_TAREA,
            payload: tarea
        });
    }

    // extrae una tarea para edición
    const guardarTareaActual = tarea => {

        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        });
    }

    // editar una tarea
    const actualizarTarea = tarea => {

        dispatch({
            type: ACTUALIZAR_TAREA,
            payload: tarea
        });
    }

    // elimina la tarea seleccionada
    const limpiarTarea = () => {

        dispatch({ type: LIMPIAR_TAREA });
    }

    return (
        <TareaContext.Provider
            value={{
                tareas: state.tareas,
                tareasProyecto: state.tareasProyecto,
                errorTarea: state.errorTarea,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                validarTarea,
                eliminarTarea,
                cambiarEstadoTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea,
            }}
        >
            { props.children }
        </TareaContext.Provider>
    )
}

export default TareaState;
