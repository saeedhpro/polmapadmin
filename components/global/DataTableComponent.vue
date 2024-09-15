<template>
  <div>
    <v-simple-table
      fixed-header
    >
      <template v-slot:default>
        <thead>
        <tr>
          <th
            v-for="(i, n) in  headers"
            :key="n"
            class="text-center"
          >
            {{ i }}
          </th>
        </tr>
        </thead>
        <tbody>
        <slot name="body"></slot>
        </tbody>
      </template>
    </v-simple-table>
    <div class="text-center pt-2">
      <pagination-component
        v-if="hasPaginate"
        :page="page"
        :last-page="lastPage"
        :total="total"
        :visible="6"
        @paginate="paginate"
      />
      <slot name="notfound"></slot>
    </div>
  </div>
</template>

<script>
import PaginationComponent from "~/components/global/PaginationComponent";

export default {
  name: "DataTableComponent",
  components: {PaginationComponent},
  props: {
    headers: {
      type: Array,
      required: true,
      default: () => []
    },
    total: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 10
    },
    lastPage: {
      type: Number,
      default: 10
    },
    hasPaginate: {
      type: Boolean,
      default: true
    },
    page: {
      type: Number,
      default: 1
    },
  },
  methods: {
    paginate(page) {
      this.$emit('paginate', page)
    }
  },
}
</script>

<style scoped lang="scss">
@import '/assets/variables';

thead {
  th {
    background: #F0F0F0 0 0 no-repeat padding-box !important;
    border: 1px solid #DBDBDB !important;
    text-align: center;
    font: normal normal bold 16px/28px $font-family;
    letter-spacing: 0;
    color: #212945;
    padding: 17px;

    &:first-child {
      border-radius: 0 8px 0 0;
    }

    &:last-child {
      border-radius: 8px 0 0 0;
    }
  }
}

</style>
