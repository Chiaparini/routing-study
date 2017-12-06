import axios from 'axios'

let baseUri = 'https://api.spotify.com/v1/'

export default {
    getCurrentUser() {
        return axios.get(baseUri + 'me')
    },
    getCurrentUserPlaylists(offset = 0) {
        return axios.get(baseUri + 'me/playlists', {
            params: {
                limit: 4,
                offset: offset
            }
        })
    },
    getUser(id) {
        return axios.get(baseUri + 'users/' + id)
    },
    getUserPlaylists(offset, id) {
        return axios.get(baseUri + 'users/' + id + '/playlists', {
            params: {
                limit: 4,
                offset: offset
            }
        })
    }
}