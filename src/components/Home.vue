<template>
  <div class="default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="body">
      <div class="carousel">
        <va-carousel :items="items" v-model="value" :ratio="21/9" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  props: {
    title: String
  },
  data() {
    return {
      value: 0,
      items: [
        'https://sportishka.com/uploads/posts/2022-04/1650547048_10-sportishka-com-p-gorod-tula-vikipediya-krasivo-foto-10.jpg',
        'https://storage.yandexcloud.net/storage.yasno.media/nat-geo/images/2019/10/11/d7cb94233c28455aac96be9344e1fab8.max-1200x800.jpg',
        'http://cdn.n71.ru/files/241728/_alf0822.jpg',
        'https://sportishka.com/uploads/posts/2022-04/thumbs/1650547028_44-sportishka-com-p-gorod-tula-vikipediya-krasivo-foto-45.jpg',
        'https://key-ms.ru/wp-content/uploads/e/2/d/e2dc92b71070c2babc81b5dd1be97a7b.jpeg'
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/defaultTemplate.scss';
@import '../assets/scss/home.scss';
</style>