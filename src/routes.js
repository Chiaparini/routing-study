import Home from './components/Home'
import About from './components/About'
import List from './components/List'
import VueRouter  from 'vue-router'
import auth from './services/auth'

const requireAuth = (to, from, next) => {
    if(!auth.isAuthenticated()) {
        auth.resetStorage()
        next({
            path: '/',
            query: { redirect: to.fullPath }
        })
    }else {
        next()
    }
}

const router = new VueRouter({
    routes: [
        { path: '/home', component: Home },
        { path: '/about', component: About, beforeEnter: requireAuth },
        { path: '/list', component: List, beforeEnter: requireAuth },
    ],
    base: '/'
})

router.beforeEach((to, from, next) => {
    if(!auth.isAuthenticated()) {
        auth.resetStorage()
    }
    next()
})

export default router