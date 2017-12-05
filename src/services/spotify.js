import axios from 'axios'

let baseUri = 'https://api.spotify.com/v1/'

export default {
    getCurrentUser() {
        return axios.get(baseUri + 'me')
    },
    getUserPlaylists() {
        return axios.get(baseUri + 'me/playlists')
    }
}