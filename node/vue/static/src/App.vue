<script setup lang="ts">
</script>

<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style scoped>
nav {
  padding: 20px;
}
nav a {
  margin: 0 10px;
}
</style>
