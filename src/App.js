import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { Login } from './components/auth/Login';
import { NuevaCuenta } from './components/auth/NuevaCuenta';
import { Proyectos } from './components/proyectos/Proyectos';
import RutaPrivada from './components/rutas/RutaPrivada';
import tokenAuth from './config/tokenAuth';

import AlertaState from './context/alertas/alertaState';
import AuthState from './context/autenticacion/authState';
import ProyectoState from './context/proyectos/proyectoState';
import TareaState from './context/tareas/tareaState';


// revisar si hay token
const token = localStorage.getItem('token');
if ( token ) {
    tokenAuth(token);
} 

const App = () => {
    return (
        <ProyectoState>
            <TareaState>
                <AlertaState>
                    <AuthState>
                        <Router>
                            <Switch>
                                <Route exact path="/" component={ Login } />
                                <Route exact path="/nueva-cuenta" component={ NuevaCuenta } />
                                <RutaPrivada exact path="/proyectos" component={ Proyectos } />
                            </Switch>
                        </Router>
                    </AuthState>
                </AlertaState>
            </TareaState>
        </ProyectoState>
    )
}

export default App;
