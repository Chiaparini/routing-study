import axios from 'axios'
import querystring from 'querystring'

const client_id = 'd8606dfebee94a349e0f19a538885a47' // Your client id
const client_secret = '58dd06eea0214415911008bd9491e152' // Your secret
const redirect_uri = 'http://localhost:8080/' // Your redirect uri

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
        return expirationDate < new Date()
    },
    login() {
        let state = this.generateRandomString(16)
        document.cookie = 'spotify_auth_state=' + state
        let scope = "user-read-private user-read-email"
        window.location = 'https://accounts.spotify.com/authorize?' + querystring.stringify({
            client_id: client_id,
            scope: scope,
            redirect_uri: redirect_uri,
            state: state,
            response_type: "token",
            show_dialog: true
        })
    }
}