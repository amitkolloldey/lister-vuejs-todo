<template>
    <div>
        <div class="text-left">
            <p v-on:click="markAllAsComplete"><span class="switch dark-border"
                                                    :class="{checked : checkRemaining}"></span> Complete All
            </p>
        </div>
    </div>
</template>

<script>
    export default {
        name:'ToDoCompleteAll',
        computed:{
            checkRemaining(){
                return this.$store.getters.checkRemaining
            }
        },
        methods:{
            markAllAsComplete() {
                this.$store.dispatch('markAllAsComplete')
            },
        }
    };
</script>
