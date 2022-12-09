<template>
  <div class="default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>*
<!--    <h3>AboutPage</h3>-->
<!--    <div class="for-table" style="display: flex; align-items: center">-->
<!--      <va-button class="mr-4 mb-2 ph-2" pressed-behavior="mask" :pressed-opacity="1" pressed-mask-color="warning"-->
<!--                 @click="getData()">Get data</va-button>-->
<!--      <va-input class="ui-input mb-2 mh-2" v-model="id" />-->
<!--      <va-button class="mr-4 mb-2 ph-2" pressed-behavior="mask" :pressed-opacity="1" pressed-mask-color="warning"-->
<!--                 @click="getDataById(id)">Get Data By Id = {{id}}</va-button>-->
<!--    </div>-->
<!--    <va-data-table :items="items"/>-->
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: 'AboutPage',
  data() {
    return {
      items: [],
      id: ''
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      DataService.getData().then(event => {
        this.items = event;
      });
    },
    async getDataById(id) {
      DataService.getDataById(id).then(event => {
        this.items = [event];
      });
    }
  },
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