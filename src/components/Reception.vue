<template>
  <div class="ma-0 default-template">
    <div class="title">
      <h3>{{ title }}</h3>
    </div>
    <div class="body">
      <div class="row-span">
        <h1>Центральная приемная Председателя партии «X»</h1>
      </div>
      <div class="row-span">
        <span><h2>Адрес:</h2> г. Тула, ул. проспект Ленина 92</span>
        <span>Телефон: (999) 9999-99-10;</span>
        <h3>Официальные страницы в социальных сетях:</h3>
        <a href="https://vk.com/swift_fx">Вконтакте</a>
        <a href="https://t.me/swiftrx">Телеграм</a>
        <h3>Адрес для почтовой корреспонденции:</h3>
        <span>0000301 г. Тула, ул. проспект Ленина 92</span>
        <h3>Способы подачи обращений граждан:</h3>
        <span>Обратиться для получения устных консультаций по +9823816248</span>
        <h3>Уточнить информацию о графике можно по телефону приемной.</h3>
      </div>
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
.body {
  .row-span {
    flex-direction: column !important;
    align-items: flex-start !important;
  }
}
</style>