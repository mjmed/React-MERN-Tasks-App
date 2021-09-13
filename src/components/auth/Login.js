import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';



export const Login = ( props ) => {

    const { alerta, mostrarAlerta } = useContext(alertaContext);
    const { autenticado, mensaje, iniciarSesion } = useContext(authContext);

    const [ usuario, guardarUsuario ] = useState({
        email: '',
        password: ''
    });

    const { email, password } = usuario;

    const handleInputChange = ({ target }) => {

        guardarUsuario({
            ...usuario,
            [target.name]: target.value
        });
    }

    // en caso de que el password o usuario no exista
    useEffect(() => {

        if ( autenticado ) {
            props.history.push('/proyectos');
        }

        if ( mensaje ) {
            mostrarAlerta( mensaje.msg, mensaje.categoria );
        }

        // eslint-disable-next-line
    }, [ autenticado, mensaje, props.history ]);

    const handleSubmit = ( e ) => {

        e.preventDefault();

        if ( email.trim() === '' || password.trim() === '' ) {
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error');
        }

        // pasa al action
        iniciarSesion({ email, password });
    }

    return (
        <div className="form-usuario">
            {
                (alerta)
                    ? ( <div className={`alerta ${ alerta.categoria }`}>{ alerta.msg }</div> )
                    : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Iniciar Sesión</h1>

                <form onSubmit={ handleSubmit }>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu email"
                            value={ email }
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu password"
                            value={ password }
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar sesión"
                        />
                    </div>
                </form>

                <Link to={'/nueva-cuenta'} className="enlace-cuenta">
                    Obtener cuenta
                </Link>
            </div>
        </div>
    )
}
