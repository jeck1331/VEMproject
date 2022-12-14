<script setup>
import {RouterLink} from 'vue-router'
</script>
<template>
  <div class="default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="body">
      <div class="row-span">
        <h1>Общественно-политическая партия "Х"</h1>
        <h3>это тульская общественно-политическая партия</h3>
      </div>
      <div class="row-span">
        <span>Адрес: г. Тула, ул. проспект Ленина 92</span>
      </div>
      <div class="row-span">
        <RouterLink class="router-link" to="../charter">Устав партии</RouterLink>
      </div>
      <div class="row-span">
        <RouterLink class="router-link" to="../persons">Лица партии</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutPage',
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
.mh-2 {
  margin: 0 10px;
}

.for-table .ui-input {
  max-width: 8vw;

  border: 1px solid black;
  border-radius: 4px;
}
@import '../assets/scss/defaultTemplate.scss';
</style>