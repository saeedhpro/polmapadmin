<template>
  <div class="pagination-component">
    <div class="prev-icon paginate-item" @click="prevPage">
      <v-icon>mdi-chevron-left</v-icon>
    </div>
    <div
      v-for="(i,n) in (page - 1)"
      :key="n"
      class="paginate-item"
      @click="pageChange(i)"
    >
      {{ i | toPersianNumber }}
    </div>
    <div
      class="paginate-item selected"
    >
      {{ page | toPersianNumber }}
    </div>

    <div
      v-for="(i,n) in lastPage - page"
      :key="n + page"
      class="paginate-item"
      @click="pageChange(i + page)"
    >
      {{ (i + page) | toPersianNumber }}
    </div>
    <div class="next-icon paginate-item" @click="nextPage">
      <v-icon>mdi-chevron-right</v-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: "PaginationComponent",
  props: {
    page: {
      type: Number,
      default: 1,
      required: true,
    },
    lastPage: {
      type: Number,
      default: 1,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
      required: true,
    },
    visible: {
      type: Number,
      default: 0,
      required: true,
    },
  },
  methods: {
    pageChange(page) {
      this.$emit('paginate', page)
    },
    prevPage() {
      if (this.page > 1) {
        this.$emit('paginate', this.page - 1)
      }
    },
    nextPage() {
      if (this.page < this.lastPage) {
        this.$emit('paginate', this.page + 1)
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "/assets/variables";

.pagination-component {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;

  .paginate-item {
    cursor: pointer;
    font-family: $font-family;
    height: 35px;
    width: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin: 0 2px;

    &.selected, &:hover {
      background: rgba(231, 109, 45, 0.15);
    }
  }
}
</style>
