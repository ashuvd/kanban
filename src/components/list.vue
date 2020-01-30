<template lang="pug">
  .list
    .list__title {{ listData.title }}
    ul.list__cards.cards
      draggable(v-model="listData.items" group="board" @start="drag=true" @end="drag=false" ghost-class="ghost")
        li.cards__item(:key="card.id" v-for="card in listData.items")
          card(:cardData="card" @click.native="openCard(card)")
    .list__add(v-if="isAdding")
      form.form(@submit.prevent="$emit('addCard', $event); isAdding = false")
        textarea.form__textarea(name="title" placeholder="Введите текст карточки")
        .form__buttons
          button.form__button.button(type="submit") Добавить карточку
          button.form__button.btn.btn_cancel(type="button" @click="isAdding = false")
            span.btn__icon
            | Отмена
    button.list__button.btn(v-else type="button" @click="isAdding = true" :class="{btn_margin: listData.items.length === 0}")
      span.btn__icon
      | Добавить еще одну карточку
</template>

<script>
import { mapState } from 'vuex';
import card from './card';
import draggable from 'vuedraggable';

export default {
  components: {
    card, draggable
  },
  props: {
    listData: {
      type: Object,
      default: () => {
        return {
          title: "",
          list: "",
          items: []
        }
      }
    }
  },
  data() {
    return {
      isAdding: false
    }
  },
  computed: {
    ...mapState({
      
    })
  },
  methods: {
    openCard(card) {
      this.$router.push({ path: `/cards/${card.id}`, query: { list: this.listData.list } })
    }
  }
}
</script>
<style lang="scss">
  @import '../assets/styles/mixins.scss';
  .list{
    width: 300px;
    padding: 12px;
    background-color: $gray;
    border-radius: 5px;
    margin-right: 24px;
    margin-bottom: 20px;
    @include tablet {
      margin-right: 0;
    }
    &:last-child{
      margin-right: 0;
      margin-bottom: 0;
    }
    &__title{
      margin-bottom: 16px;
    }
    &__add{
      margin-top: 12px;
    }
    &__button{
      margin-top: 12px;
    }
  }
  .cards{
    display: flex;
    flex-direction: column;
    &__item{
      margin-bottom: 12px;
      &:last-child{
        margin-bottom: 0;
      }
    }
  }
  .form{
    &__buttons{
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .btn_margin{
    margin-top: 0;
  }
  .ghost{
    .card{
      background-color: $ghost;
      box-shadow: none;
      color: $ghost;
    }
  }
</style>
