<template>
  <div class="profiles-page">
    <div class="profiles">
      <my-button @click.native="showModal">
        <template v-slot:value>Добавить пользователя</template>
      </my-button>
      <my-table
        :options="optionTable"
        :parent="newData"
        :sorted="sorted"
        :data="data"
        @sort="sortUsers"
      >
      </my-table>
    </div>

    <modal
      v-show="isShowModal"
      :users="data"
      :title="modalName"
      @add-user="addUser"
      @close="closeModal"
    />
  </div>
</template>

<script>
function createId() {
  const random = Math.random();
  return random.toString(16).substr(2);
}

let lastId = createId();
import Modal from "@/components/Modal.vue";
import MyButton from "@/components/MyButton.vue";
import MyTable from "@/components/MyTable.vue";
export default {
  name: "ProfilesPage",
  components: {
    Modal,
    MyButton,
    MyTable,
  },
  data() {
    return {
      isShowModal: false,
      modalName: "Дбавление пользователя",
      sorted: "",
      optionTable: [
        { title: "Имя", field: "name" },
        { title: "Телефон", field: "phone" },
      ],
      data: {
        [lastId]: {
          id: lastId,
          name: "Марина",
          phone: "89818888888",
          childrenIds: [],
          parentId: null,
        },
      },
    };
  },

  watch: {
    data() {
      localStorage.setItem("data", JSON.stringify(this.data));
    },
  },

  mounted() {
    if (localStorage.getItem("data") !== null) {
      this.data = JSON.parse(localStorage.getItem("data"));
    }
  },

  computed: {
    newData() {
      return Object.keys(this.data)
        .map((id) => this.data[id])
        .filter((el) => !el.parentId);
    },
  },
  methods: {
    showModal() {
      this.isShowModal = true;
    },
    closeModal() {
      this.isShowModal = false;
    },
    sortUsers(type) {
      this.sorted = type;
    },
    addUser(name, phone, parentId) {
      const newData = Object.assign({}, this.data);
      const parent = newData[parentId] && Object.assign({}, newData[parentId]);

      const user = {
        id: createId(),
        name,
        childrenIds: [],
        parentId,
        phone,
      };

      if (parent) {
        parent.childrenIds.push(user.id);
        newData[parentId] = parent;
      }

      newData[user.id] = user;
      this.data = Object.assign({}, newData);
    },
  },
};
</script>

<style>
</style>