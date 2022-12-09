<script setup>
import {RouterLink, RouterView} from 'vue-router'
</script>

<template>
  <header>
    <div class="header-block">
      <div class="title">
        <RouterLink class="router-link" to="/">Общественно-политическая партия "X"</RouterLink>
      </div>
      <div class="nav-elements">
        <div class="element">
          <RouterLink v-for="item in links" :key="item.id" class="router-link" :to="item.route">{{ item.title }}</RouterLink>
        </div>
      </div>
    </div>
  </header>

  <RouterView/>
</template>

<script>
export default {
  data() {
    return {
      links: [
        {title: 'Главная', route: '/', id: 0},
        {title: 'О партии', route: '/about', id: 1},
        {title: 'Лица', route: '/persons', id: 2},
        {title: 'Устав', route: '/charter', id: 3},
        {title: 'Новости', route: '/news', id: 4},
        {title: 'Голосование', route: '/vote', id: 5},
        {title: 'Приемная', route: '/reception', id: 6},
        {title: 'Фотогалереия', route: '/gallery', id: 7}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/app.scss';
</style>