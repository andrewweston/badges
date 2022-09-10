import {WebAuth} from 'auth0-js';
import {push} from 'connected-react-router';

export default class Auth {
    auth0 = new WebAuth({
        domain: __CONFIG__.auth0.domain,
        clientID: __CONFIG__.auth0.clientId,
        redirectUri: `${window.location.origin}`,
        audience: __CONFIG__.auth0.audience,
        responseType: 'token id_token',
        scope: __CONFIG__.auth0.scope
    });

    constructor(store) {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.store = store;
    }

    login() {
        this.auth0.authorize();
    }

    logout() {
        //clear auth data from localstorage
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('id_token');
        window.localStorage.removeItem('expires_at');
        window.localStorage.removeItem('is_admin');
        //go back to the homepage
        this.store.dispatch(push('/'));
        //and clean up state
        this.store.dispatch({ type: 'USER_LOGOUT' });
    }

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                this.store.dispatch(push('/'));
            }
            else if (err) {
                console.log('Authentication error:');
                console.log(err);
                this.store.dispatch(push('/'));
            }
        });
    }

    isAuthenticated() {
        //check if the access token expired
        const expiresAt = JSON.parse(window.localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    setSession(authResult) {
        const expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        window.localStorage.setItem('is_admin', authResult.idTokenPayload['https://scale-it.au.auth0.com/app_metadata'].authorization.roles.includes('app-admin'));
        window.localStorage.setItem('access_token', authResult.accessToken);
        window.localStorage.setItem('id_token', authResult.idToken);
        window.localStorage.setItem('expires_at', expiresAt);
        //go back to the homepage
        this.store.dispatch(push('/'));
    }
}
