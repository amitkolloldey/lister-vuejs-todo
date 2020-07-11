import Home from "./components/Pages/Home";
import Todo from "./components/ToDo/ToDo";
import About from "./components/Pages/About";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Logout";

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/todo',
        component: Todo,
        meta: {
            authUsers: true
        }
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/login',
        component: Login,
        meta: {
            guestUsers: true
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            guestUsers: true
        }
    },
    {
        path: '/logout',
        component: Logout,
        meta: {
            authUsers: true
        }
    },
]

export default routes