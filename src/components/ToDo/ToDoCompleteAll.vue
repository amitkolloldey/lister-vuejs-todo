<template>
    <div>
        <div class="text-left">
            <p v-on:click="markAllAsComplete"><span class="switch dark-border"
                                                    :class="{checked : checkRemaining}"></span> {{changeCompleteAllText}}
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
            },
            changeCompleteAllText(){
                return this.$store.getters.changeCompleteAllText
            }
        },
        methods:{
            markAllAsComplete() {
                this.$store.dispatch('markAllAsComplete', this.checkRemaining)
            },
        }
    };
</script>
