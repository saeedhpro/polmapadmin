<template>
  <div class="order-list-item-component">
    <v-img height="90px" width="90px" :src="product.thumbnail" :alt="product.title" />
    <span>{{ product.title | toPersianNumber }}</span>
  </div>
</template>

<script>
export default {
  name: "OrderListItemComponent",
  props: {
    product: {
      type: Object,
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    },
    attributes: {
      type: Array,
      default: [],
    }
  }
}
</script>

<style scoped lang="scss">
.order-list-item-component {
  width: 100px;
  padding: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
