<template>
  <div class="ma-0 default-template">
    <div class="title">
      <h1>{{ title }} «X»</h1>
    </div>
    <div class="body">
      <span>
        {{textCharter}}
      </span>
    </div>
  </div>
</template>

<script>
import DataService from '@/services/DataService';

export default {
  name: "CharterPage",
  data() {
    return {
      textCharter: ''
    }
  },
  created() {
    this.getCharter();
  },
  methods: {
    getCharter() {
      DataService.getCharter().then(data => {
        this.textCharter = data[0].charterText;
      })
    }
  },
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/defaultTemplate.scss';
@import '../assets/scss/charter.scss';
</style>