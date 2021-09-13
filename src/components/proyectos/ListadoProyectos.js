import React, { useContext, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import proyectoContext from '../../context/proyectos/proyectoContext';
import alertaContext from '../../context/alertas/alertaContext';
import { Proyecto } from './Proyecto';


export const ListadoProyectos = () => {

    const { mensaje, proyectos, obtenerProyectos } = useContext( proyectoContext );
    const { alerta, mostrarAlerta } = useContext( alertaContext );
    
    useEffect(() => {

        // si hay error
        if ( mensaje ) {
            mostrarAlerta( mensaje.msg, mensaje.categoria );
        }

        obtenerProyectos();
    
        // eslint-disable-next-line
    }, [mensaje]);

    if ( proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;


    return (
        <ul className="listado-proyectos">
            {
                (alerta)
                    ? <div className={`alerta ${ alerta.categoria }`}>{ alerta.msg }</div>
                    : null
            }
            <TransitionGroup>
                {
                    proyectos.map( proyecto => (
                        
                        <CSSTransition
                            key={ proyecto._id }
                            timeout={ 200 }
                            classNames="proyecto"
                        >
                            {
                                <Proyecto
                                    proyecto={ proyecto }
                                />
                            }
                        </CSSTransition>
                    ))
                }
            </TransitionGroup>
        </ul>
    )
}
