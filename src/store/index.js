import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        todos: [
            {
                'id': 1,
                'title': "Finish ToDo Vue",
                'completed': false,
                'editing': false,
            },
            {
                'id': 2,
                'title': "Finish Saas Adventure",
                'completed': false,
                'editing': false,
            },
            {
                'id': 3,
                'title': "Finish Vue Laravel Ecommerce",
                'completed': false,
                'editing': false,
            },
            {
                'id': 4,
                'title': "Finish Interview Preparations",
                'completed': false,
                'editing': false,
            },
        ],
        activeFilter: 'all-tasks',
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
        markAllAsIncompleteBtn(state) {
            if (state.todos.filter(todo => todo.completed).length > 0) {
                return false
            }
            return true
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
        markAllAsComplete(state) {
            if (this.getters.remaining === 0) {
                state.todos.forEach(todo => todo.completed = false)
            } else {
                state.todos.forEach(todo => todo.completed = true)
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
    },
    actions: {
        changeFilter(context, filter) {
            setTimeout(() => {
                context.commit('changeFilter', filter)
            }, 100)
        },
        doneEdit(context, todo) {
            setTimeout(() => {
                context.commit('doneEdit', todo)
            }, 100)
        },
        markAsComplete(context, todo) {
            setTimeout(() => {
                context.commit('markAsComplete', todo)
            }, 100)
        },
        markAllAsComplete(context) {
            setTimeout(() => {
                context.commit('markAllAsComplete')
            }, 100)
        },
        clearCompleted(context) {
            setTimeout(() => {
                context.commit('clearCompleted')
            }, 100)
        },
        removeTodo(context, id) {
            setTimeout(() => {
                context.commit('removeTodo', id)
            }, 100)
        },
        addTodo(context, todo) {
            setTimeout(() => {
                context.commit('addTodo', todo)
            }, 100)
        },
    }
})