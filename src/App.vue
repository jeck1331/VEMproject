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
          <va-button
              v-if="token"
              class="mr-2 mb-2 router-link"
              @click="signOut()"
          >
            Выйти
          </va-button>
        </div>
      </div>
    </div>
  </header>

  <RouterView @signOut='signOut' @checkToken='checkToken' />
</template>

<script>

import DataService from "@/services/DataService";

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
        {title: 'Фотогалереия', route: '/gallery', id: 7},
        {title: 'Вход / Регистрация', route: '/login', id: 8}
      ],
      token: false,
      loginPage: {title: 'Вход / Регистрация', route: '/login', id: 8}
    }
  },
  created() {
    this.checkToken();
  },
  methods: {
    checkToken() {
      DataService.checkToken().then(x => {
        this.token = x;
        if (x)  {
          this.links.pop();
        } else {
          if (!this.links.find(x => x.route == this.loginPage.route)) {
            this.links.push(this.loginPage);
          }
        }
      });
    },
    signOut() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('login');
      this.checkToken();
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/scss/app.scss';
</style>