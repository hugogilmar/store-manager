<template>
  <v-pagination
    v-model="page"
    :length="pages"
    v-if="pages > 1"
  ></v-pagination>
</template>

<script>
  export default {
    name: 'Pagination',
    props: [
      'limit',
      'offset',
      'count'
    ],
    data () {
      return {
        page: 1
      }
    },
    computed: {
      pages () {
        let quotient = this.count % this.limit;
        let remainder = this.count / this.limit;

        if (this.limit > this.count) {
          quotient = 0;
        }

        return quotient + (remainder % 1 > 0 ? 1 : 0);
      },
      currentPage () {
        return 1 + (this.offset / this.limit);
      }
    },
    watch: {
      count (value) {
        this.setCurrentPage();
      },
      page (value) {
        let offset = this.limit * (value - 1)

        this.$emit('paginate', {
          limit: this.limit,
          page: this.page,
          pages: this.pages,
          count: this.count,
          offset: offset
        });
      }
    },
    created () {
      this.setCurrentPage();
    },
    methods: {
      setCurrentPage () {
        this.page = this.currentPage;
      }
    }
  }
</script>
