<template lang="pug">
  .card
    .card__title(ref="text")
      span(ref="points") ...
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      default: () => {
        return {
          id: "",
          title: "",
          desc: ""
        };
      }
    }
  },
  mounted() {
    const text = this.$refs.text;
    // Сохраняем начальные параметры
    const width = text.getBoundingClientRect().width; // Ширина контейнера
    const heightInitial = text.getBoundingClientRect().height; // Высота контейнера изначальная
    let height = text.getBoundingClientRect().height; // Высота контейнера
    const widthPoints = this.$refs.points.getBoundingClientRect().width;
    const widthSpace = 4; // Ширина пробела
    const limitWidth = width * 2 - widthPoints - widthSpace; // Ограничение по заполнению двух строк
    const words = this.cardData.title.split(" "); // Разбиваем на слова
    const firstWord = words.length && words[0]; // Первое слово
    const span = document.createElement("span");
    span.innerHTML = firstWord;
    text.append(span);
    const firstWidthWord = span.getBoundingClientRect().width; // Ширина первого слова
    text.innerHTML = ""; // Очищаем контейнер
    words.reduce((prev, word) => {
      if (word && prev !== null) {
        // Если слово это пробел или появлся запрет на дальнейшую вставку то мы сюда не заходим и возвращаем предыдущее значение
        const span = document.createElement("span");
        span.innerHTML = word + " ";
        text.append(span);
        const currentWidthWord = span.getBoundingClientRect().width; // Ширина текущего слова
        const currentHeightText = text.getBoundingClientRect().height; // Текущая высота контейнера
        if (firstWidthWord > width) {
          // Проверяем выходит ли первое слово за пределы контейнера, если да то обрезаем слово и показываем троеточие средствами CSS
          prev = null;
        } else if (prev + currentWidthWord < limitWidth) { // Если сумма предыдущих ширин слов + ширина текущего слова < чем лимит по ширине
          if (currentHeightText > height && height === heightInitial) { // Если слово оказалось широким и перескочило на другую строку
            height = currentHeightText; // перезаписываем текущую высоту
            prev = currentWidthWord + widthSpace + width; // то рассчитываем общую длину как ширина контейнера + ширина текущего слова + ширина пробела
          } else {
            prev += currentWidthWord + widthSpace; // обычная ситуация, прибавляем к предыдущей общей накопленной ширине текущую ширину + ширина пробела
          }
        } else { // Если мы превысили лимит по длине, то удаляем текущее слово и ставим вместо него троеточие
          span.remove();
          const points = document.createElement("span");
          points.innerHTML = "...";
          text.append(points);
          prev = null;
        }
      }
      return prev;
    }, 0);
  }
};
</script>
<style lang="scss">
.card {
  cursor: pointer;
  width: 100%;
  background-color: $white;
  color: $text;
  padding: 8px 12px;
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.25);
  border-radius: 2px;
  &__title {
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
