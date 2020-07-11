<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "Logout",
        created() {
            this.$store.dispatch('logout')
                .then(response => {
                    console.log(response)
                    this.$router.push('/')
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }
</script>