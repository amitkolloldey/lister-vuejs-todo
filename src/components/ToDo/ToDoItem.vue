<template>
    <div class="todo">
        <div class="text-left w-10" v-on:click="doneEdit(true)">
            <span class="switch" :class="{checked : completed}"></span>
        </div>
        <div class="w-80">
            <div v-on:click="toggleEdit" v-if="!editing" :class="{completed : completed}">
                {{title}}
            </div>
            <input v-model="title" type="text" class="editinput" v-else @keyup.enter="doneEdit"
                   @blur="doneEdit" v-focus/>
        </div>
        <div class="text-right w-10" v-on:click="removeTodo(todo.id)">
            <span class="remove">&times;</span>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ToDoItem',
        props: {
            todo: {
                type: Object,
                required: true
            },
            checkAll: {
                type: Boolean,
                required: true
            },
        },
        data() {
            return {
                id: this.todo.id,
                title: this.todo.title,
                completed: this.todo.completed,
                editing: this.todo.editing,
                beforeEdit: "",
            }
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus()
                }
            }
        },
        methods: {
            removeTodo(id) {
                this.$store.dispatch('removeTodo', id)
            },
            toggleEdit() {
                this.beforeEdit = this.title
                this.editing = true
            },
            doneEdit(value = false) {
                if (value === true){
                    this.completed = !this.completed
                }
                if (this.title.trim() === '') {
                    this.title = this.beforeEdit
                }
                this.editing = false
                this.$store.dispatch('doneEdit', {
                    id: this.id,
                    title: this.title,
                    completed: this.completed,
                    editing: this.editing,
                })
            },
        },
        watch: {
            checkAll: function () {
                this.completed = this.checkAll ? true : this.todo.completed;
            }
        }
    }
</script>
<style>


</style>