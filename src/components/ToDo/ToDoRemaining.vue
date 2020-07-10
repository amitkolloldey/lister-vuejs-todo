<template>
    <div>
        <span>{{ remaining }} Tasks Left</span>
    </div>
</template>

<script>
    export default {
        name:'ToDoRemaining',
        computed:{
            remaining(){
                return this.$store.getters.remaining
            }
        }
    };
</script>
