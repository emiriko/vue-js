<script setup lang="ts">
</script>

<template>
  <div class = "flex flex-col m-0 p-0 w-full">
    <h1 class = "capitalize text-5xl font-bold text-white w-full"> {{ $route.name }}</h1>
    <slot></slot>

    <div class = "flex flex-col gap-y-8 text-center w-full m-0 py-20">
      <span class = "uppercase text-2xl font-bold text-white line m-0 w-full">
        <h1 class = "m-0 p-0 w-full"> <span class = "m-0 p-0"> or </span> </h1>
      </span>
      <router-link to = "url" class = "font-bold m-0 hover:text-light-white duration-300 text-3xl">
        Create an Account
      </router-link>
    </div>
  </div>
</template>
