<template>
    <!-- <header>
        <div class="wrapper">
            <nav>
                <RouterLink to="/" >Home</RouterLink>
                <RouterLink to="/about">About</RouterLink>
            </nav>
        </div>
    </header> -->
    
    <div class="bg-black">
        <nav class="container px-6 py-8 mx-auto md:flex md:justify-between md:items-center">

            <div class="flex items-center justify-between">
                <router-link to="/" class="text-xl font-bold text-gray-100 md:text-2xl hover:text-red-500">
                    Logo
                </router-link>
                <!-- Mobile menu button -->
                <div @click="toggleNav" class="flex md:hidden">
                <button
                    type="button"
                    class="
                    text-gray-100
                    hover:text-gray-400
                    focus:outline-none focus:text-gray-400
                    "
                >
                    <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                    <path
                        fill-rule="evenodd"
                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                    </svg>
                </button>
                </div>
            </div>

            <!-- Mobile view -->
            <ul
                :class="showMenu ? 'flex' : 'hidden'"
                class="
                flex-col
                mt-8
                space-y-4
                md:flex md:space-y-0 md:flex-row md:items-center md:space-x-10 md:mt-0
                "
            >
                <RouterLink :to="{ name: 'home' }" class="text-gray-100 hover:text-red-500" @click="toggleNav">Home</RouterLink>
                <RouterLink :to="{ name: 'about' }" class="text-gray-100 hover:text-red-500" @click="toggleNav">About</RouterLink>
                <RouterLink :to="{ name: 'setting' }" class="text-gray-100 hover:text-red-500" @click="toggleNav">Setting</RouterLink>
                <RouterLink to="#" class="text-gray-100 hover:text-red-500" @click="authStore.userLogout()">Logout</RouterLink>
            </ul>
        </nav>
    </div>


</template>

<script setup>
    import { RouterLink } from 'vue-router'
    import { ref } from 'vue';
    import { useAuthStore } from '../stores/auth';

    let showMenu = ref(false);
    const toggleNav = () => { showMenu.value = !showMenu.value }

    const authStore = useAuthStore()

</script>

<style lang="scss" scoped>

</style>