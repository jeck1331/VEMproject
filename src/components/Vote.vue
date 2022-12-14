<template>
  <div class="default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="body">
      <div class="vote-items">
        <div class="item-count">
          <span>Количество голосов: {{countValue}} человек</span>
          <span>Процент относительно других партий: {{value}}</span>
        </div>
        <va-progress-bar class="item" :model-value="value" />
        <va-input
            class="mb-4 item"
            v-model="namePerson"
            label="Имя"
        />
        <va-button
            class="mr-2 mb-2 item"
            @click="checkVote()"
        >
          Проголосовать
        </va-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VotePage",
  data() {
    return {
      value: 40,
      namePerson: null,
      countValue: 250000123
    }
  },
  methods: {
    checkVote() {
      if (this.namePerson) {
        this.$vaToast.init({message: 'Успешно!', color:'success'});
      } else {
        this.$vaToast.init({message: 'Ошибка, скорее всего вы не ввели имя!', color:'danger'});
      }
    }
  },
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/scss/defaultTemplate.scss';
@import '../assets/scss/vote.scss';
</style>