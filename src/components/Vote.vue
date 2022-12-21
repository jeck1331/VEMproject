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
        <va-progress-bar class="item" style="margin-bottom: 40px" :model-value="value"/>
        <h3 v-if="!token">
          Чтобы проголосовать перейдите к
          <RouterLink class="router-link" to="login">регистрации или авторизации</RouterLink>
          !</h3>
        <va-input
            v-if="token && !voited"
            class="mb-4 item"
            v-model="namePerson"
            clearable
            :text="hasToken()"
            label="Имя"
        />
        <va-button
            v-if="namePerson && token && !voited"
            class="mr-2 mb-2 item"
            @click="checkIsVoting()"
        >
          Проголосовать
        </va-button>
        <h3 v-if="voited && token">Вы уже проголосовали!</h3>
        <va-modal
            v-model="showCustomContent"
            no-padding
        >
          <template #content>
            <span>Подтвердить голос?</span>
            <va-button
                v-if="namePerson && token"
                class="mr-2 mb-2 item"
                @click="vote()"
            >
              Да
            </va-button>
          </template>
        </va-modal>
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
      countValue: null,
      token: false,
      showCustomContent: false,
      voited: false
    }
  },
  created() {
    this.hasToken();
    this.getVotes();
  },
  methods: {
    vote() {
      if (this.namePerson) {
        DataService.postUserVote(this.countValue + 1, this.countValue, this.namePerson).then(res => {
          this.$vaToast.init({message: 'Успешно!', color: 'success'});
          this.countValue = res[0].countVotes;
          this.value = ((this.countValue / 143000000) * 100).toFixed(5);
          this.voited = true;
          this.showCustomContent = !this.showCustomContent;
        })
      } else {
        this.showCustomContent = !this.showCustomContent;
        this.$vaToast.init({message: 'Ошибка, скорее всего вы не ввели имя!', color: 'danger'});
      }
    },
    getVotes() {
      DataService.getVotes().then(data => {
        this.countValue = data[0].countVotes;
        this.value = ((this.countValue / 143000000) * 100).toFixed(5);
      });
    },
    hasToken() {
      DataService.checkToken().then(x => {
        this.token = x;
        this.checkIsVoting();
      });
    },
    checkIsVoting() {
      DataService.postCheckVote().then(x => {
        if (x === true) {
          this.showCustomContent = !this.showCustomContent;
        } else {
          this.voited = true;
        }
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
@import '../assets/scss/vote.scss';
</style>