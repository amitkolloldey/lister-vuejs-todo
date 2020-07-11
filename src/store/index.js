import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

axios.defaults.baseURL = 'http://todo-laravel.test/api';

export const store = new Vuex.Store({
    state: {
        todos: [],
        activeFilter: 'all-tasks',
        completeAllText: '',
        token: localStorage.getItem('access_token') || null
    },
    getters: {
        remaining(state) {
            return state.todos.filter(todo => !todo.completed).length
        },
        checkRemaining(state, getters) {
            return getters.remaining === 0
        },
        todosFiltered(state) {
            if (state.activeFilter === 'completed-tasks') {
                return state.todos.filter(todo => todo.completed)
            } else if (state.activeFilter === 'active-tasks') {
                return state.todos.filter(todo => !todo.completed)
            }
            return state.todos
        },
        clearCompletedBtn(state) {
            if (state.todos.filter(todo => todo.completed).length > 0) {
                return false
            }
            return true
        },
        changeCompleteAllText(state, getters) {
            if (getters.remaining === 0) {
                return state.completeAllText = "Mark All As In-Complete"
            }
            return state.completeAllText = "Mark All As Complete"
        },
        authCheck(state) {
            return state.token !== null
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push({
                id: todo.id,
                title: todo.title,
                completed: false,
                editing: false,
            })
        },
        removeTodo(state, id) {
            const index = state.todos.findIndex(item => item.id === id)
            state.todos.splice(index, 1)
        },
        changeFilter(state, filter) {
            state.activeFilter = filter
        },
        clearCompleted(state) {
            state.todos = state.todos.filter(todo => !todo.completed)
        },
        markAllAsComplete(state, checked) {
            if (checked === 1) {
                state.todos.forEach(todo => todo.completed = true)
            } else {
                state.todos.forEach(todo => todo.completed = false)
            }
        },
        doneEdit(state, todo) {
            const index = state.todos.findIndex(item => item.id === todo.id)
            state.todos.splice(index, 1, {
                id: todo.id,
                title: todo.title,
                completed: todo.completed,
                editing: todo.editing,
            })
        },
        getTodos(state, todos) {
            state.todos = todos
        },
        login(state, token) {
            localStorage.setItem('access_token', token)
            state.token = token
        },
        register(state, token) {
            localStorage.setItem('access_token', token)
            state.token = token
        },
        logout(state) {
            state.token = null
        }
    },
    actions: {
        getTodos(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.get('/todos')
                .then(response => {
                    context.commit('getTodos', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        changeFilter(context, filter) {
            context.commit('changeFilter', filter)
        },
        doneEdit(context, todo) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.put('/todo/update/' + todo.id, {
                title: todo.title,
                completed: todo.completed
            })
                .then(response => {
                    context.commit('doneEdit', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        markAllAsComplete(context, checked) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.put('/todos/completeAll', {
                completed: checked === false ? 1 : 0
            })
                .then(response => {
                    context.commit('markAllAsComplete', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        clearCompleted(context) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            const todos = context.state.todos.filter(todo => todo.completed).map(todo => todo.id)
            axios.delete('/todos/clearCompleted', {
                data: {
                    todos: todos
                }
            })
                .then(response => {
                    console.log(response.data)
                    context.commit('clearCompleted')
                })
                .catch(error => {
                    console.log(error)
                })
        },
        removeTodo(context, id) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.delete('/todo/delete/' + id)
                .then(response => {
                    context.commit('removeTodo', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        addTodo(context, todo) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
            axios.post('/todo/create', {
                title: todo.title,
                completed: false
            })
                .then(response => {
                    context.commit('addTodo', response.data)
                })
                .catch(error => {
                    console.log(error)
                })
        },
        login(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/login', {
                    username: data.username,
                    password: data.password
                })
                    .then(response => {
                        context.commit('login', response.data.access_token)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        register(context, data) {
            return new Promise((resolve, reject) => {
                axios.post('/register', {
                    name: data.name,
                    email: data.email,
                    password: data.password
                })
                    .then(response => {
                        context.commit('register', response.data.access_token)
                        resolve(response)
                    })
                    .catch(error => {
                        reject(error)
                    })
            })
        },
        logout(context) {
            if (context.getters.authCheck) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + context.state.token
                return new Promise((resolve, reject) => {
                    axios.post('/logout')
                        .then(response => {
                            localStorage.removeItem('access_token')
                            context.commit('logout')
                            resolve(response)
                        })
                        .catch(error => {
                            localStorage.removeItem('access_token')
                            context.commit('logout')
                            reject(error)
                        })
                })
            }
        }
    }
})