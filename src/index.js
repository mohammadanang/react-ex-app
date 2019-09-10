import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from 'serviceWorker'
import { createBrowserHistory } from "history"
import { Router, Route, Switch, Redirect } from "react-router-dom"
import { ToastContainer } from "react-toastify"

import PrivateRoute from "components/PrivateRoute"
import AdminLayout from "layouts/Admin"
import Login from "views/Login"

import "assets/scss/black-dashboard-react.scss"
import "react-toastify/dist/ReactToastify.css"
import "assets/demo/demo.css"
import "assets/css/nucleo-icons.css"
import "assets/scss/main.scss"

const hist = createBrowserHistory()

ReactDOM.render(
    <>
        <Router history={hist}>
            <Switch>
                <PrivateRoute path="/app" component={AdminLayout} />
                <Route path="/login" component={Login} />
                <Redirect from="/" to="/login" />
            </Switch>
        </Router>
        <ToastContainer position="top-center" autoClose={4000} hideProgressBar={true} />
    </>, 
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
