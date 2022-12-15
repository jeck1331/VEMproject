<template>
  <div class="default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="body">
      <div class="vote-items">
        <div class="item-count">
          <span>Количество голосов: {{ countValue }} человек ({{ value }}%)</span>
        </div>
        <va-progress-bar class="item" :model-value="value"/>
        <va-input
            class="mb-4 item"
            v-model="namePerson"
            label="Имя"
        />
        <va-button
            v-if="namePerson"
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
import DataService from "@/services/DataService";

export default {
  name: "VotePage",
  data() {
    return {
      value: null,
      namePerson: null,
      countValue: null
    }
  },
  created() {
    this.getVotes();
  },
  methods: {
    checkVote() {
      if (this.namePerson) {
        DataService.putVotes(this.countValue + 1, this.countValue).then(res => {
          this.$vaToast.init({message: 'Успешно!', color: 'success'});
          this.countValue = res[0].countVotes;
          this.value = ((this.countValue / 143000000) * 100).toFixed(5);
        })
      } else {
        this.$vaToast.init({message: 'Ошибка, скорее всего вы не ввели имя!', color: 'danger'});
      }
    },
    getVotes() {
      DataService.getVotes().then(data => {
        this.countValue = data[0].countVotes;
        this.value = ((this.countValue / 143000000) * 100).toFixed(5);
      });
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