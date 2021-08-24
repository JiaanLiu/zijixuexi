import { createRouter, createWebHistory } from 'vue-router'

const Home = () =>
    import ('@/views/home/home')
const Category = () =>
    import ('@/views/category/category')
const Shopcart = () =>
    import ('@/views/shopcart/shopcart')
const Profile = () =>
    import ('@/views/profile/profile')
const Detail = () =>
    import ('@/views/detail/detail')

const routes = [{
        path: '',
        redirect: '/home'

    }, {
        path: '/home',
        component: Home,
        meta: {
            footShow: true,
        }
    },
    {
        path: '/category',
        component: Category,
        meta: {
            footShow: true,
        }
    },
    {
        path: '/shopcart',
        component: Shopcart,
        meta: {
            footShow: true,
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            footShow: true,
        }
    },
    {
        path: '/detail/:iid',
        component: Detail
    },

    // {
    //     path: '/about',
    //     name: 'About',
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () =>
    //         import ( /* webpackChunkName: "about" */ '../views/About.vue')
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router