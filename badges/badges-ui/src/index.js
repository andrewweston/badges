import React from 'react';
import ReactDOM from 'react-dom';
import {applyMiddleware, compose, createStore} from 'redux';
import {Provider} from 'react-redux';
import {createHashHistory} from 'history';
import {connectRouter, routerMiddleware, ConnectedRouter} from 'connected-react-router';
import {Route, Switch} from 'react-router';
//import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import reducer from './reducers';
import {Page} from './page';
import Auth from  './auth0';

const history = createHashHistory();

// Init redux
let middleware = [routerMiddleware(history)]; // for dispatching history actions
let composeEnhancers = compose;
if (process.env.NODE_ENV !== 'production') {
    middleware = [ ...middleware ];
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({trace: true, traceLimit: 25}) ||
    composeEnhancers;
}


const store = createStore(
    reducer(history), // new root reducer with router state
    {},
    composeEnhancers(applyMiddleware(...middleware))
);

export const dispatch = store.dispatch;

const auth = new Auth(store);
const handleAuthentication = (nextState) => {
    if (/access_token|id_token|error/.test(nextState.location.pathname)) {
        auth.handleAuthentication();
    }
};

// Render the main app react component into the app div.
ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>
                <Switch>
                    <Route render={props => {
                        handleAuthentication(props);
                        return <Page authenticated={auth.isAuthenticated()} auth={auth} path={props.location.pathname} />;
                    }} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('react-root')
);
