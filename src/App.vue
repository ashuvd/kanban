<template lang="pug">
  .wrapper(:class="{ blockScroll: isBlocked }")
    board
    router-view
</template>
<script>
import { mapState } from 'vuex';
import board from './views/board.vue';
export default {
  components: {
    board
  },
  data() {
    return {
      isBlocked: false
    }
  },
  computed: {
    ...mapState({
    })
  },
  methods: {

  }
}
</script>
<style lang="scss">
  @import 'normalize.css';
  // layout
  @import './assets/styles/fonts.scss';
  @import './assets/styles/mixins.scss';
  // base
  @import "./assets/styles/base.scss";
</style>
