<template>
  <div class="table">
    <div v-if="isHead" class="table__head">
      <div
        v-for="option in options"
        :key="option.title"
        class="table__cell"
        :style="option.style"
        @click="sortUsers(option.field)"
      >
        {{ option.title }}
      </div>
    </div>
    <div v-if="parent.length" class="table__body">
      <div
        v-for="(item, i) in sortData"
        :key="'dataTable' + i"
        class="table__row"
      >
        <div v-for="option in options" :key="option.field" class="table__coll">
          <div class="table__cell" :style="option.style">
            <span class="table__cell-text">
              {{
                item.childrenIds.length && option.field === "name" ? "+" : ""
              }}
              {{ i + 1 }}) {{ item[option.field] }}
              {{
                option.field === "name"
                  ? `(id:${item.id} children:${item.childrenIds.length})`
                  : ""
              }}
            </span>
          </div>
        </div>
        <div v-if="item.childrenIds.length" class="table__children">
          <my-table
            :is-head="false"
            :options="options"
            :data="data"
            :sorted="sorted"
            :parent="getChildren(item)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  components: {
    MyTable: () => import("@/components/MyTable.vue"),
  },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    parent: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
    sorted: {
      type: String,
      default: "name",
    },
    isHead: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    sortData() {
      return this.parent
        .slice()
        .sort((a, b) => (b[this.sorted] < a[this.sorted] ? 1 : -1));
    },
  },

  methods: {
    getChildren(data) {
      return data.childrenIds.map((id) => this.data[id]);
    },
    sortUsers(type) {
      this.$emit("sort", type);
    },
  },
};
</script>

<style>
.table {
  display: flex;
  flex-direction: column;
  font-size: 14px;
}

.table__head {
  display: flex;
  row-gap: 10px;
  column-gap: 10px;
  color: var(--table-header-text);
  position: relative;
  min-height: 34px;
  overflow: hidden;
  z-index: 1;
}

.table__row {
  position: relative;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin: 5px;
  cursor: pointer;
}

.table__children {
  grid-column-start: 1;
  grid-column-end: 3;
}
.table__coll {
  overflow: hidden;
  width: 100%;
  flex: 1;
}
.table__cell-text {
  width: 100%;
  line-height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.table__cell {
  padding: 10px;
  display: flex;
  flex: 1;
  justify-content: center;
  flex-direction: column;
  text-align: start;
}
</style>