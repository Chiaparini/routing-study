<template>
    <div>
        <div class="section">
            <div class="field has-text-left column is-one-quarter">
                <label class="label">User:</label>
                <div class="control">
                    <input @blur="fetchUserData" v-model="userId" class="input" type="text" placeholder="User ID">
                </div>
                <p class="help">Inser the users id to fetch the user data</p>
            </div>
            <div class="container">
                <img v-if="user.images" :src="user.images[0].url" :alt="user.name">
                <p class="title is-6"> <a target="_blank" v-if="user.external_urls" :href="user.external_urls.spotify">@{{ user.id }}</a></p>
                <p class="subtitle is-6">e-mail: {{ user.email }} | {{ user.product }}</p>
                <p v-if="user.followers">followers: {{ user.followers.total }}</p>
            </div>
        </div>
        <p class="has-text-left" v-if="playlists.items">showing: {{ playlists.items.length }} of {{ playlists.total }}</p>
        <div class="columns is-multiline" >
            <div class="column is-one-quarter" v-for="(playlist, index) in playlists.items" :key="playlist.id" >
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <a :href="playlist.external_urls.spotify">
                                <img v-if="playlist.images.length" :src="playlist.images[0].url">
                            </a>
                        </figure>
                    </div>
                    <div class="card-content">
                        <div class="media">
                            <div class="media-content">
                                <p class="title is-4"> <a :href="playlist.uri">{{ playlist.name }}</a></p>
                                <p class="subtitle is-6"> <a :href="playlist.external_urls.spotify">@{{ playlist.id }}</a></p>
                            </div>
                        </div>
                        <div class="content">
                            <p><a :href="playlist.tracks.href">tracks:</a> {{ playlist.tracks.total }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import spotifyApi from '../services/spotify'
    export default {
        name: 'List',
        data() {
            return {
                user: {},
                loading: false,
                playlists: [],
                offset: 0,
                userId: ''
            }
        },
        mounted() {
            this.loading = true
            spotifyApi.getCurrentUser().then(response => {
                this.user = response.data 
                this.loading = false
            })

            spotifyApi.getCurrentUserPlaylists().then(response => {
                this.playlists = response.data
            })
        },
        methods: {
            handleScroll(evnt) {
                let percentage = (((window.scrollY + window.innerHeight)/this.$el.clientHeight) * 100).toFixed()
                if(percentage > 98) {
                    this.fillPlaylists()
                }
            },
            fillPlaylists() {
                window.removeEventListener('scroll', this.handleScroll)
                if(this.userId) {
                    spotifyApi.getUserPlaylists(this.offset += 4, this.userId).then(response => {
                        response.data.items.filter(el => {this.playlists.items.push(el)})
                        window.addEventListener('scroll', this.handleScroll)                    
                    })
                }else {
                    spotifyApi.getCurrentUserPlaylists(this.offset += 4).then(response => {
                        response.data.items.filter(el => {this.playlists.items.push(el)})
                        window.addEventListener('scroll', this.handleScroll)                    
                    })
                }
            },
            fetchUserData() {
                if(!this.userId) return
                this.offset = 0
                this.playlists.items = []
                spotifyApi.getUser(this.userId).then(response => {
                    this.user = response.data
                })
                spotifyApi.getUserPlaylists(0, this.userId).then(response => {
                    this.playlists = response.data
                })
            }
        },
        created() {
            window.addEventListener('scroll', this.handleScroll)
        }
    }
</script>

<style lang="scss" scoped>

</style>

