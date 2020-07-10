<template>
    <div>
        <button class="btn btn-all" :class="{ active : activeFilter === 'all-tasks' }"
                v-on:click="changedFilter('all-tasks')">All Tasks
        </button>
        <button class="btn btn-active" :class="{ active : activeFilter === 'active-tasks' }"
                v-on:click="changedFilter('active-tasks')">Active Tasks
        </button>
        <button class="btn btn-completed" :class="{ active : activeFilter === 'completed-tasks' }"
                v-on:click="changedFilter('completed-tasks')">Completed Tasks
        </button>
        <button class="btn btn-clear btn-warning" :class="{ active : !markAllAsIncompleteBtn }"
                v-on:click="clearCompleted">Clear Completed Tasks
        </button>
    </div>
</template>

<script>
    // import {EventBus} from "../../main";

    export default {
        name: "ToDoFilters",

        computed: {
            activeFilter() {
                return this.$store.state.activeFilter
            },
            markAllAsIncompleteBtn() {
                return this.$store.getters.markAllAsIncompleteBtn
            },
        },
        methods: {
            changedFilter(filter) {
                this.$store.dispatch('changeFilter', filter)
            },
            clearCompleted() {
                this.$store.dispatch('clearCompleted')
            }
        }
    }
</script>