<template>
    <div class="Auth bg-dark p-20">
        <form method="post" @submit.prevent="login">
            <div class="box">
                <h1>Login</h1>

                <label>
                    <input type="email" name="email" placeholder="Email" class="email" v-model="email"/>
                </label>

                <label>
                    <input type="password" name="email" placeholder="Password" class="email" v-model="password"/>
                </label>

                <label>
                    <button class="btn btn-login">Login</button>
                </label>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            login() {
                this.$store.dispatch('login', {
                    username: this.email,
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
<style>
    .Auth.bg-dark.p-20 {
        text-align: center;
        color: #fff;
    }

    .Auth.bg-dark.p-20 input {
        width: 100%;
        padding: 15px;
        border: none;
        margin-bottom: 20px;
        outline: none;
        border-radius: 5px;
    }

    button.btn.btn-login, button.btn.btn-register {
        padding: 10px;
        display: block;
        background: #42b983;
        color: #fff;
        font-size: 16px;
        border-radius: 5px;
    }
</style>
