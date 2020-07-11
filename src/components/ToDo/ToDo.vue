<template>
    <div class="ToDo p-20 bg-light">
        <h1>List Your Todos</h1>
        <input type="text" placeholder="Enter Your Todo" v-model="newTodo" v-on:keyup.enter="addTodo" class="todoInput">
        <div class="todos">
            <ToDoItem v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="checkRemaining"></ToDoItem>
            <div class="todo_meta">
                <ToDoCompleteAll></ToDoCompleteAll>
                <ToDoRemaining></ToDoRemaining>
            </div>
            <div class="todo_filters">
                <ToDoFilters></ToDoFilters>
            </div>
        </div>
    </div>
</template>

<script>
    import ToDoItem from './ToDoItem'
    import ToDoRemaining from './ToDoRemaining'
    import ToDoCompleteAll from "./ToDoCompleteAll";
    import ToDoFilters from "./ToDoFilters";

    export default {
        components: {
            ToDoCompleteAll,
            ToDoItem,
            ToDoRemaining,
            ToDoFilters
        },
        data() {
            return {
                newTodo: '',
                nextTodoId: 5,
            }
        },
        computed: {
            checkRemaining() {
                return this.$store.getters.checkRemaining
            },
            todosFiltered() {
                return this.$store.getters.todosFiltered
            }
        },
        mounted() {
           this.$store.dispatch('getTodos')
        },
        methods: {
            addTodo() {
                if (this.newTodo.trim().length === 0) {
                    return alert('Please enter a value')
                }
                this.$store.dispatch('addTodo', {
                    id: this.nextTodoId,
                    title: this.newTodo
                })
                this.nextTodoId++
                this.newTodo = ""
            },
        },
    };
</script>

<style>

    .todo {
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #42b983;
        color: #fff;
        padding: 10px;
        margin-bottom: 10px;
        width: 100%;
        border-radius: 5px;
    }

    .remove {
        background: #273849;
        border-radius: 50%;
        height: 20px;
        width: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 20px;
        cursor: pointer;
        display: inline-block;
    }

    .remove:hover {
        background: #2c3e50;
    }

    input.editinput, input.editinput:hover, input.editinput:focus {
        border: none;
        font-size: 16px;
        color: #fff;
        width: 100%;
        background: none;
        outline: none
    }

    .w-10 {
        width: 10%;
    }

    .w-80 {
        width: 80%;
    }

    .text-right {
        text-align: right;
    }

    .todo_meta p {
        cursor: pointer;
    }

    .todoInput {
        width: 100%;
        border: 1px solid #42b983;
        padding: 15px 10px;
        font-size: 16px;
        color: #2c3e50;
        border-radius: 5px;
    }

    .todos {
        margin: 20px 0;
        text-align: left;
        width: 100%;
    }

    .todo_meta, .todo_filters {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin-bottom: 10px;
        width: 100%;
        border-bottom: 1px solid #eee;
    }

    .w-20 {
        width: 20%;
    }

    .w-70 {
        width: 70%;
    }

    .w-60 {
        width: 60%;
    }

    .switch {
        height: 20px;
        width: 20px;
        border-radius: 50%;
        border: 2px solid #fff;
        display: inline-block;
        position: relative;
        cursor: pointer;
        line-height: 20px;
    }

    .switch.checked:after {
        position: absolute;
        height: 100%;
        width: 100%;
        background: #2c3e50;
        left: 0;
        top: 0;
        content: "\2713";
        font-size: 16px;
        text-align: center;
        border-radius: 50%;
        color: #fff;
    }

    .switch.checked {
        border-color: #2c3e50;
    }

    .completed {
        text-decoration: line-through;
        opacity: .6;
    }

    .dark-border {
        border-color: #2c3e50;
        margin-bottom: -5px;
    }

    .todo_meta p {
        cursor: pointer;
    }

    .btn {
        padding: 5px;
        margin: 0 5px;
        background: none;
        border: 1px solid #2c3e50;
        cursor: pointer;
        font-size: 12px;
    }

    .btn.active {
        background: #2c3e50;
        color: #fff;
    }

    .btn-warning {
        border-color: brown;
        color: brown;
        pointer-events: none;
        opacity: .5;
    }

    .btn-warning.active {
        background: brown;
        color: white;
        pointer-events: auto;
        opacity: 1;
    }
    .ToDo {
        text-align: center;
    }
</style>