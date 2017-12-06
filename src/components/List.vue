<template>
    <div>
        <div class="section">
            <div class="container">
                <img v-if="user.images" :src="user.images[0].url" :alt="user.name">
                <p class="title is-6"> <a target="_blank" v-if="user.external_urls" :href="user.external_urls.spotify">@{{ user.id }}</a></p>
                <p class="subtitle is-6">e-mail: {{ user.email }} | {{ user.product }}</p>
                <p v-if="user.followers">followers: {{ user.followers.total }}</p>
            </div>
        </div>
        <p class="has-text-left">showing: {{ playlists.items.length }} of {{ playlists.total }}</p>
        <div class="columns is-multiline" >
            <div class="column is-one-quarter" v-for="(playlist, index) in playlists.items" :key="playlist.id" >
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <a :href="playlist.external_urls.spotify"><img :src="playlist.images[0].url"></a>
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
            }
        },
        mounted() {
            this.loading = true
            spotifyApi.getCurrentUser().then(response => {
                this.user = response.data 
                this.loading = false
            })

            spotifyApi.getUserPlaylists().then(response => {
                this.playlists = response.data
            })
            
            
        },
        methods: {
            handleScroll(evnt) {
                let percentage = (((window.scrollY + window.innerHeight)/this.$el.clientHeight) * 100).toFixed()
                console.log(percentage)
                if(percentage > 90) {
                    this.fillPlaylists()
                }
            },
            fillPlaylists() {
                window.removeEventListener('scroll', this.handleScroll)
                spotifyApi.getUserPlaylists(this.offset += 4).then(response => {
                    response.data.items.filter(el => {this.playlists.items.push(el)})
                    window.addEventListener('scroll', this.handleScroll)                    
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

