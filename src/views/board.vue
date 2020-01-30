<template lang="pug">
  .container
    .board
      list(:listData="inWork" @addCard="addCard($event, 'ADD_CARD_IN_WORK')")
      list(:listData="onCheck" @addCard="addCard($event, 'ADD_CARD_ON_CHECK')")
      list(:listData="completed" @addCard="addCard($event, 'ADD_CARD_COMPLETED')")
</template>

<script>
import { mapState } from 'vuex';
import list from '../components/list';

export default {
  components: {
    list
  },
  computed: {
    ...mapState({
      inWork: state => state.cards.inWork,
      onCheck: state => state.cards.onCheck,
      completed: state => state.cards.completed,
    })
  },
  methods: {
    addCard(e, mutation) {
      const { title } = e.target.elements;
      const card = {
        title: title.value,
        desc: ""
      }
      this.$store.commit(`cards/${mutation}`, card)
    },
  }
}
</script>
<style lang="scss">
  .board{
    width: 100%;
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
  }
</style>
