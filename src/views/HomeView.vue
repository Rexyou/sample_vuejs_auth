<script setup>

  import { useAuthStore } from "../stores/auth";
  const authStore = useAuthStore()
  
</script>

<template>
  <div>
    <h1 class="text-center text-2xl pt-10">Welcome, {{ authStore.authUser?.username }}</h1>
    
  </div>
</template>

<style lang="scss" scoped>

</style>