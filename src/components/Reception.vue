<template>
  <div class="ma-0 default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
export default {
  name: "ReceptionPage",
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/defaultTemplate.scss';
</style>