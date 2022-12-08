<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="header-block">
      <div class="title">
        Vue + Express Project
      </div>
      <div class="nav-elements">
        <div class="element">
          <RouterLink class="router-link" to="/">Home</RouterLink>
        </div>
        <div class="element">
          <RouterLink class="router-link" to="/about">About</RouterLink>
        </div>
      </div>
    </div>
  </header>

  <RouterView/>
</template>

<style lang="scss" scoped>
@import 'assets/scss/app.scss';
</style>
