<template>
	<div id="app">
		<main-header :navigation="navigation"></main-header>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import MainHeader from './components/MainHeader'
	import auth from './services/auth'
	
	export default {
		name: 'App',
		components: {
			MainHeader
		},
		data () {
			return {
				navigation: [{ name: 'Home' }, { name: 'List' }, { name: 'About' }]
			}
		},
		created() {
			if(window.location.hash.includes('access_token')) {
				auth.setToken()
			}
		}
	}
</script>

<style lang="scss">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}

	h1, h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	a {
		color: #42b983;
	}
</style>
