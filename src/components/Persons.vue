<template>
  <div class="default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="persons">
      <div class="person" v-for="person in persons" :key="person.id">
        <div class="image">
          <img  :src="getImage(person.srcImage)" width="150" height="150" alt="">
        </div>
        <div class="info">
          <h1>{{person.name}}</h1>
          <span>{{person.desciption}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "PersonsPage",
  data() {
    return {
      persons: [],
      id: ''
    }
  },
  created() {
    this.getPersons();
  },
  methods: {
    async getPersons() {
      DataService.getPersons().then(data => {
        this.persons = data;
      });
    },
    getImage(path) {
      return require('../assets/images/' + path);
    }
  },
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/defaultTemplate.scss';
@import '../assets/scss/persons.scss';
</style>