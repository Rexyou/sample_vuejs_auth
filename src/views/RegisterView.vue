<template>
    <section class="bg-gray-50">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 border-2 border-black">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                        Create and account
                    </h1>
                    <form class="space-y-4 md:space-y-6" @submit.prevent="submit">
                        <div>
                            <label for="username" class="block mb-2 text-sm font-medium text-gray-900">Your username</label>
                            <input type="text" name="username" id="username" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="+6011********" required="" v-model="form.username">
                            <span v-for="error in v$.username.$errors" :key="error.$uid" class="text-red-600">
                                {{ error.$message }} <br/>
                            </span>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                            <input type="password" name="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" v-model="form.password">
                            <span v-for="error in v$.password.$errors" :key="error.$uid" class="text-red-600">
                                {{ error.$message }} <br/>
                            </span>
                        </div>
                        <div>
                            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
                            <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="Confirm Password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required="" v-model="form.password_confirmation">
                            <span v-for="error in v$.password_confirmation.$errors" :key="error.$uid" class="text-red-600">
                                {{ error.$message }} <br/>
                            </span>
                        </div>
                        <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700" :disabled="authStore.lockButton">Create an account</button>
                        <input type="hidden" v-model="form.type">
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account?
                            <router-link :to="{ name: 'login' }" class="font-medium text-primary-600 text-red-600 hover:underline">Login here</router-link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>

    import { reactive, computed } from 'vue';
    import { useVuelidate } from '@vuelidate/core'
    import { required, email, minLength, sameAs } from '@vuelidate/validators'
    import { useAuthStore } from '../stores/auth';

    const authStore = useAuthStore()

    const form = reactive({
        username: '',
        password: '',
        password_confirmation: '',
        type: 1
    })

    const rules = computed(()=> {
        return {
            username: { required },
            password: { required, minLength: minLength(3) },
            password_confirmation: { required, minLength: minLength(3), sameAs: sameAs(form.password) },
        }
    })

    const v$ = useVuelidate(rules, form);
    const submit = async () => {
        const result = await v$.value.$validate();
        if(result){
            authStore.userRegister(form)
        }
    }

</script>

<style lang="scss" scoped>

</style>