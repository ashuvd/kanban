import uuid from 'uuid/v4';

const cards = {
  namespaced: true,
  state: {
    inWork: {
      title: 'В работе',
      list: "IN_WORK",
      items: []
    },
    onCheck: {
      title: 'На проверке',
      list: "ON_CHECK",
      items: []
    },
    completed: {
      title: 'Выполнено',
      list: "COMPLETED",
      items: []
    }
  },
  getters: {
    GET_CARD_IN_WORK: state => id => {
      return state.inWork.items.find(card => card.id === id);
    },
    GET_CARD_ON_CHECK: state => id => {
      return state.onCheck.items.find(card => card.id === id);
    },
    GET_CARD_COMPLETED: state => id => {
      return state.completed.items.find(card => card.id === id);
    }
  },
  mutations: {
    ADD_CARD_IN_WORK(state, card) {
      card.id = uuid();
      state.inWork.items.push(card);
    },
    ADD_CARD_ON_CHECK(state, card) {
      card.id = uuid();
      state.onCheck.items.push(card);
    },
    ADD_CARD_COMPLETED(state, card) {
      card.id = uuid();
      state.completed.items.push(card);
    },
    SAVE_CARD_IN_WORK(state, card) {
      state.inWork.items.forEach((item, index, items) => {
        if (item.id === card.id) {
          card.id = uuid();
          items.splice(index, 1, card);
        }
      })
    },
    SAVE_CARD_ON_CHECK(state, card) {
      state.onCheck.items.forEach((item, index, items) => {
        if (item.id === card.id) {
          card.id = uuid();
          items.splice(index, 1, card);
        }
      })
    },
    SAVE_CARD_COMPLETED(state, card) {
      state.completed.items.forEach((item, index, items) => {
        if (item.id === card.id) {
          card.id = uuid();
          items.splice(index, 1, card);
        }
      })
    }
  },
  actions: {

  }
}
export default cards;