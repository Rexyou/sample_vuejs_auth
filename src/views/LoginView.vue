<template>
    <div>
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div class="w-full p-6 m-auto bg-white rounded shadow-lg lg:max-w-md">
                <h1 class="text-3xl font-semibold text-center text-red-600">LOGO</h1>

                <form class="mt-6" @submit.prevent="submitForm">
                    <div>
                        <label for="email" class="block text-sm text-gray-800">Username</label>
                        <input type="text" v-model="form.username" id="email"
                            class="block w-full px-4 py-2 mt-2 text-gray-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40">
                        <span v-for="error in v$.username.$errors" :key="error.$uid" class="text-red-600">
                            {{ error.$message }}
                        </span>
                    </div>
                    <div class="mt-4">
                        <div>
                            <label for="password" class="block text-sm text-gray-800">Password</label>
                            <input type="password" v-model="form.password" id="password"
                                class="block w-full px-4 py-2 mt-2 text-gray-500 bg-white border rounded-md focus:border-red-500 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40">
                            <span v-for="error in v$.password.$errors" :key="error.$uid" class="text-red-600">
                                {{ error.$message }}
                            </span>
                        </div>
                        <a href="#" class="text-xs text-gray-600 hover:underline">Forget Password?</a>
                        <div class="mt-6">
                            <button :disabled="authStore.lockButton"
                                class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-400 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-300">
                                Login
                            </button>
                        </div>
                        <input type="hidden" v-model="form.type">
                    </div>
                </form>
                <p class="mt-8 text-xs font-light text-center text-gray-700"> 
                    Don't have an account? 
                    <router-link :to="{ name: 'register' }" class="font-medium text-red-600 hover:underline">Sign up</router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, computed } from 'vue';
    import { useAuthStore } from '../stores/auth';
    import { useVuelidate } from '@vuelidate/core'
    import { required, email, minLength } from '@vuelidate/validators'
    import { RouterLink } from 'vue-router'; 

    const authStore = useAuthStore();

    const form = reactive({
        username:'',
        password: '',
        type: 1
    })

    const rules = computed(()=> {
        return {
            username: { required },
            password: { required, minLength: minLength(8) },
        } 
    })

    const v$ = useVuelidate(rules, form)

    const submitForm = async () => {
        console.log(form)
        const result = await v$.value.$validate();
        if(result){
            authStore.userLogin(form);
        }
    }

</script>

<style lang="scss" scoped>

</style>