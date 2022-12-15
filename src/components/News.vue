<template>
  <div class="default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="body">
      <div class="cards">
        <div class="card" v-for="itemNew in getList()" :key="itemNew.id">
          <va-card class="item">
            <va-image
                class="image"
                src="https://key-ms.ru/wp-content/uploads/e/2/d/e2dc92b71070c2babc81b5dd1be97a7b.jpeg"
                style="height: 200px;"
            />
            <va-card-title>{{itemNew.title}}</va-card-title>
            <va-card-content>{{itemNew.description}}</va-card-content>
          </va-card>
        </div>
      </div>
      <va-pagination
          v-model="currentPage"
          :pages="pagesCount"
          :visible-pages="4"
      />
    </div>
  </div>
</template>

<script>
import DataService from '@/services/DataService';

export default {
  name: "NewsPage",
  data() {
    return {
      newsList: [],
      maxCards: 4,
      currentPage: 1,
      pagesCount: 0
    }
  },
  created() {
    this.getNews();
  },
  methods: {
    getNews() {
      DataService.getNews().then(data => {
        this.newsList = data;
        this.pagesCount = Math.ceil(this.newsList.length / this.maxCards);
      })
    },
    testMet(i) {
      let a = i >= (this.currentPage === 1 ? 0 : ((this.currentPage - 1) * this.maxCards));
      let b = i < (this.currentPage === 1 ? (this.currentPage * this.maxCards) - 1 : (this.currentPage * this.maxCards) + (this.maxCards - 1));
      let s = a && b;
      console.log(i, ' < ---- ----- > ', s, '| pagesCount', this.pagesCount);
      return s;
    },
    getList() {
      let newList = this.newsList.filter((_, i) => i > this.testMet(i));
      return newList;
    }
  },
  props: {title: String}
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/defaultTemplate.scss';
@import '../assets/scss/news.scss';
</style>