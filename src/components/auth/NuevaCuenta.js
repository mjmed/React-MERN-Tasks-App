import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import alertaContext from '../../context/alertas/alertaContext';
import authContext from '../../context/autenticacion/authContext';


export const NuevaCuenta = ( props ) => {

    const { alerta, mostrarAlerta } = useContext(alertaContext);
    const { autenticado, mensaje, registrarUsuario } = useContext(authContext);

    const [ usuario, guardarUsuario ] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    });

    const { nombre, email, password, confirmar } = usuario;

    const handleInputChange = ({ target }) => {

        guardarUsuario({
            ...usuario,
            [target.name]: target.value
        });
    }

    // en caso de que el usuario se haya autenticado o registrado o sea
    // un registro duplicado
    useEffect(() => {

        if ( autenticado ) {
            props.history.push('/proyectos');
        }

        if ( mensaje ) {
            mostrarAlerta( mensaje.msg, mensaje.categoria );
        }
        
    }, [ autenticado, mensaje, props.history ]);

    const handleSubmit = ( e ) => {

        e.preventDefault();

        // validar que no haya campos vacíos
        if ( nombre.trim() === '' ||
             email.trim() === '' ||
             password.trim() === '' ||
             confirmar.trim() === '' ) {

            mostrarAlerta( 'Todos los campos son obligatorios', 'alerta-error' );
            return;
        }

        // password mínimo de 6 caracteres
        if ( password.length < 6 ) {
            mostrarAlerta( 'El password debe ser de al menos 6 caracteres', 'alerta-error' );
            return;
        }

        // los dos password sean iguales
        if ( password !== confirmar ) {
            mostrarAlerta( 'Los passwords no son iguales', 'alerta-error' );
            return;
        }

        // pasarlo al action
        registrarUsuario({
            nombre,
            email,
            password
        });
    }

    return (
        <div className="form-usuario">
            {
                (alerta)
                    ? ( <div className={`alerta ${ alerta.categoria }`}>{ alerta.msg }</div> )
                    : null
            }
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una cuenta</h1>

                <form onSubmit={ handleSubmit }>
                    <div className="campo-form">
                        <label htmlFor="nombre">Nombre</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Tu nombre"
                            value={ nombre }
                            onChange={ handleInputChange }
                        />
                    </div>

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
                        <label htmlFor="confirmar">Confirmar password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Repite tu password"
                            value={ confirmar }
                            onChange={ handleInputChange }
                        />
                    </div>

                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link to={'/'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link>
            </div>
        </div>
    )
}
