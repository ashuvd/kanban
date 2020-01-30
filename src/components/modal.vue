<template lang="pug">
  .overlay
    .modal
      .modal__title
        textarea.textarea(v-if="edit" v-model="card.title")
        .title(v-else @click="edit = true") {{ card.title }}
      form.modal__form.form.form_modal
        textarea.form__textarea(v-model="card.desc" placeholder="Описание")
        button.form__button.button(type="button" @click="saveCard") Сохранить
      router-link(tag="button" to="/" class="modal__btn btn btn_cancel")
        span.btn__icon
</template>

<script>

export default {
  data() {
    return {
      card: {
        id: "",
        title: "",
        desc: ""
      },
      edit: false
    }
  },
  created() {
    this.card = this.$store.getters[`cards/GET_CARD_${this.$route.query.list}`](this.$route.params.id);
  },
  methods: {
    saveCard() {
      this.$store.commit(`cards/SAVE_CARD_${this.$route.query.list}`, this.card);
      this.$router.push('/');
    }
  }
}
</script>
<style lang="scss">
  .overlay{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: color($black a(20%));
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .modal{
    width: 600px;
    background-color: $gray;
    padding: 16px 16px 13px 16px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    &__title{
      width: 100%;
      margin-bottom: 16px;
      padding-right: 30px;
    }
    &__btn{
      position: absolute;
      top: 16px;
      right: 16px;
      padding: 0;
      .btn__icon{
        margin: 0;
      }
    }
  }
  .form{
    &_modal{
      .form__button{
        align-self: flex-start;
      }
      .form__textarea{
        min-height: 95px;
      }
    }
  }
  .title{
    font-size: 24px;
    line-height: 28px;
    font-weight: 700;
    color: $black;
  }
  .textarea{
    font-size: 24px;
    line-height: 28px;
    font-weight: 700;
    color: $black;
    width: 100%;
  }
</style>
