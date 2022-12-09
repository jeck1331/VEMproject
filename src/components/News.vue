<template>
  <div class="default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewsPage",
  props: {title: String}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/defaultTemplate.scss';
</style>