import axios from 'axios'
import querystring from 'querystring'

axios.defaults.headers.common['Authorization'] = "Bearer " + window.localStorage.access_token;

export default {
    generateRandomString(length) {
        let text = '';
        let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (let i = 0; i < length; i++) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
    },
    resetStorage() {
        window.localStorage.removeItem('access_token')
        window.localStorage.removeItem('expires')
    },
    setToken() {
        window.localStorage.setItem('access_token', this.getAccessTokenFromUrl().access_token)
        window.localStorage.setItem('expires', this.getAccessTokenFromUrl().expires)
    },
    getAccessTokenFromUrl() {
        let expireDate = new Date()
        return {
            access_token: window.location.hash.split('&')[0].split('=')[1],
            expires: expireDate.setSeconds(expireDate.getSeconds() + window.location.hash.split('&')[2].split('=')[1])
        }
    },
    isAuthenticated() {
        return window.localStorage.access_token && !this.isTokenExpired()
    },
    isTokenExpired() {
        const expirationDate = window.localStorage.expires
        return expirationDate < new Date().getMilliseconds()
    },
    login() {
        let state = this.generateRandomString(16)
        document.cookie = 'spotify_auth_state=' + state
        let scope = "user-read-private user-read-email"
        window.location = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
            client_id: process.env.CLIENT_ID,
            scope: scope,
            redirect_uri: process.env.REDIRECT_URI,
            state: state,
            response_type: "token",
            show_dialog: true
        })
    }
}