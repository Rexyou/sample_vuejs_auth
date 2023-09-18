<template>
    <div class="flex justify-center flex-col items-center min-h-screen w-screen">
        <h1 class="text-center text-6xl text-red-600">Not found</h1>
        <RouterLink :to="{ name: 'home' }">
            <button class="m-5 border-2 border-black px-5 py-4 text-md hover:bg-red-600 hover:text-white">Back to homepage</button>
        </RouterLink>
    </div>
</template>

<script setup>
    import { RouterLink } from 'vue-router';
</script>

<style lang="scss" scoped>

</style>