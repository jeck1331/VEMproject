<template>
  <div class="default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="body">
      <va-input
          class="mb-4 item"
          v-model="login"
          label="Логин"
      />
      <va-input
          class="mb-4 item"
          :type="isPasswordVisible ? 'text' : 'password'"
          v-model="password"
          label="Пароль"
      >
        <template #appendInner>
          <va-icon
              :name="isPasswordVisible ? 'visibility_off' : 'visibility'"
              size="small"
              color="--va-primary"
              @click="isPasswordVisible = !isPasswordVisible"
          />
        </template>
      </va-input>
      <va-button
          v-if="login && password"
          class="mr-2 mb-2 item"
          @click="signIn()"
      >
        Войти
      </va-button>
      <va-button
          v-if="login && password"
          class="mr-2 mb-2 item"
          @click="registration()"
      >
        Зарегистрироваться
      </va-button>
      <va-modal v-model="showModal" :message="message" title="Внимание"/>
    </div>
  </div>
</template>

<script>
import DataService from "@/services/DataService";

export default {
  name: "LoginPage",
  data() {
    return {
      login: "",
      password: "",
      showModal: false,
      message: "",
      isPasswordVisible: false,
    }
  },
  methods: {
    signIn() {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('login');
      DataService.postAuth(this.login, this.password).then(x => {
        if (x.message == "ok" && x.login && x.token) {
          this.message = "Вы успешно авторизировались!";
          sessionStorage.setItem('token', x.token);
          sessionStorage.setItem('login', x.login);
        } else {
          this.message = "Данные для входа указаны неверно!";
        }
        this.showModal = !this.showModal;
        this.$emit('checkToken');
      });
    },
    registration() {
      DataService.postReg(this.login, this.password).then(x => {
        if (x.message == "ok") {
          this.message = "Регистрация прошла успешно!";
        } else {
          this.message = "При регистрации возникла ошибка, видимо вы ввели слишком короткий логин менее 4 символов и короткий пароль менее 6 символов!";
        }
        this.showModal = !this.showModal;
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

.body {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .item {
    margin-bottom: 20px;
  }

  .item:first-child {
    margin-top: 20px;
  }

  .item:last-child {
    margin-bottom: 0;
  }
}
</style>