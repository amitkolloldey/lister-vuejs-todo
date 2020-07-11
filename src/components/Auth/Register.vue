<template>
    <div class="Auth bg-dark p-20">
        <form method="post" @submit.prevent="register">
            <div class="box">
                <h1>Register</h1>

                <label>
                    <input type="text" name="name" placeholder="Name" v-model="name"/>
                </label>

                <label>
                    <input type="email" name="email" placeholder="Email" v-model="email"/>
                </label>

                <label>
                    <input type="password" name="password" placeholder="Password" v-model="password"/>
                </label>

                <label>
                    <button class="btn btn-login">Register</button>
                </label>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Register",
        data() {
            return {
                name: '',
                email: '',
                password: ''
            }
        },
        methods: {
            register() {
                this.$store.dispatch('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                })
                    .then(response => {
                        console.log(response)
                        this.$router.push('/todo')
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        }
    };
</script>
