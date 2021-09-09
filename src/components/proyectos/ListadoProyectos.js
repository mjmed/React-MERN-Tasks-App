import React, { useContext, useEffect } from 'react';

import proyectoContext from '../../context/proyectos/proyectoContext';
import { Proyecto } from './Proyecto';


export const ListadoProyectos = () => {

    const { proyectos, obtenerProyectos } = useContext( proyectoContext );

    useEffect(() => {

        obtenerProyectos();

    }, []);

    if ( proyectos.length === 0 ) return <p>No hay proyectos, comienza creando uno</p>;


    return (
        <ul className="listado-proyectos">
            {
                proyectos.map( proyecto => (
                    
                    <Proyecto
                        key={ proyecto.id }
                        proyecto={ proyecto }
                    />
                ))
            }
        </ul>
    )
}
