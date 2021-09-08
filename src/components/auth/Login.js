import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export const Login = () => {

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

    const handleSubmit = ( e ) => {

        e.preventDefault();
    }

    return (
        <div className="form-usuario">
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
