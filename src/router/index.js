import Vue from 'vue'
import Router from 'vue-router'
import ProfilesPage from '@/views/ProfilesPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'ProfilesPage',
      component: ProfilesPage
    }
  ]
})
