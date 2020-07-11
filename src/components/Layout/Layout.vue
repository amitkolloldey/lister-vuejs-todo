<template>
    <div>
        <header>
            <div class="container bg-light p-20">
                <div class="left p-20">
                    <img alt="Task List logo" src="/assets/logo.png" class="logo">
                </div>
                <div class="right">
                    <ul>
                        <li>
                            <router-link to="/">Home</router-link>
                        </li>
                        <li v-if="authCheck">
                            <router-link to="/todo">Todo</router-link>
                        </li>
                        <li>
                            <router-link to="/about">About</router-link>
                        </li>
                        <li v-if="!authCheck">
                            <router-link to="/login">Login</router-link>
                        </li>
                        <li v-if="!authCheck">
                            <router-link to="/register">Register</router-link>
                        </li>
                        <li v-if="authCheck">
                            <router-link to="/logout">Logout</router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
        <section>
            <div class="container p-20 mt-50">
                <div class="content">
                    <router-view></router-view>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
    export default {
        name: "Layout",
        computed:{
            authCheck(){
                return this.$store.getters.authCheck
            }
        }
    };
</script>
<style>
    * {
        box-sizing: border-box;
    }

    .container {
        width: 90%;
        margin: 0 auto;
    }

    .content {
        margin: 50px 0;
    }

    .bg-dark {
        background: #2c3e50;
        border-bottom: 2px solid #273849;
    }

    .bg-light {
        background: aliceblue;
    }

    .p-20 {
        padding: 20px;
    }

    .mt-50 {
        margin-top: 50px;
    }

    header {
        text-align: center;
    }

    header ul {
        display: inline-flex;
        padding: 0;
        margin: 0;
        list-style: none;
    }

    header ul li a {
        display: block;
        padding: 5px 10px;
        color: #2c3e50;
        text-decoration: none;
    }

    header ul li a:hover {
        color: #42b983;
        text-decoration: underline;
    }

    img.logo {
        width: 100px;
    }
</style>
