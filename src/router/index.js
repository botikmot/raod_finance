import { createRouter, createWebHashHistory } from 'vue-router'
import Auth from '../pages/auth/UserAuth.vue'
import AdminPage from '../pages/admin/AdminPage.vue'
import UserPage from '../pages/user/UserPage.vue'
import NewData from '../components/data/NewData.vue'
import Report from '../components/data/Reports.vue'
import ReportItems from '../components/data/ReportItems.vue'
import ReportsObligation from '../components/data/ReportsObligation.vue'
import ReportsDisbursement from '../components/data/ReportsDisbursement.vue'
import ReportsActivity from '../components/data/ReportsActivity.vue'
import AccountsPayable from '../components/data/AccountsPayable.vue'
import FundTransfer from '../components/data/FundTransfer.vue'
import store from '../store/index'

const routes = [
  { path: '/', redirect: '/user' },
  { path: '/login', component: Auth, meta: { requiresUnAuth: true } },
  { path: '/admin', name: 'Admin', component: AdminPage, meta: { requiresAdmin: true, requiresAuth: true } },
  { path: '/user', name: 'User', component: UserPage },
  { path: '/newdata', name: 'NewData', component: NewData, meta: { requiresAuth: true } },
  { path: '/report', name: 'Report', component: Report, meta: { requiresAuth: true } },
  { path: '/payable', name: 'AccountsPayable', component: AccountsPayable, meta: { requiresAuth: true } },
  { path: '/fundtransfer', name: 'FundTransfer', component: FundTransfer, meta: { requiresAuth: true } },
  { path: '/reports/details', component: ReportItems, meta: { requiresAuth: true } },
  { path: '/reports/obligation', component: ReportsObligation, meta: { requiresAuth: true } },
  { path: '/reports/disbursement', component: ReportsDisbursement, meta: { requiresAuth: true } },
  { path: '/reports/activity', component: ReportsActivity, meta: { requiresAuth: true } },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(function(to, _, next){
  if(to.meta.requiresAuth && !store.getters.isAuthenticated){
    next('/login')
  }else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
    next('/user')
  }else if(to.meta.requiresAuth && to.meta.requiresAdmin && store.getters.isAdmin === 0){
    next('/user')
  }else{
    next()
  }
})

export default router
