import Vue from 'vue'
import Router from 'vue-router'
import {store} from './store/index'

import Layout from './components/Layout/Layout'
import routes from "./routes";

Vue.use(Router)

const router = new Router({
    routes,
    mode: 'history'
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.authUsers)) {
        if (!store.getters.authCheck) {
            next({
                path: '/login',
            })
        } else {
            next()
        }
    } else if (to.matched.some(record => record.meta.guestUsers)) {
        if (store.getters.authCheck) {
            next({
                path: '/',
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

new Vue({el: '#layout', render: h => h(Layout), store, router})