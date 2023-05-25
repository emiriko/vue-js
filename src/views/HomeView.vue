<script setup lang="ts">
</script>

<template>
  <div class="hero" style="background-color: #272727;">
    <div class="flex flex-col font-bold">
      <h1 class="title">Tracko</h1>
      <p class="subtitle">Never miss an episode again!</p>
      <router-link to="/auth/sign-in" class="cta-button  w-fit m-auto">Get Started</router-link>
      <div class = "flex">

      </div>
    </div>
  </div>
</template>

<style scoped>

.title {
  font-size: 3rem;
  color: #ffffff;
  margin-bottom: 1rem;
}

.subtitle {
  font-size: 1.5rem;
  color: #ffffff;
  margin-bottom: 2rem;
}

.cta-button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  font-size: 1.2rem;
  color: #ffffff;
  background-color: #ff6600;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.cta-button:hover {
  background-color: #cc5500;
}

</style>
