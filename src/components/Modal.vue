<template>
  <transition name="modal-fade">
    <div class="modal-backdrop" ref="modal">
      <div class="modal">
        <div class="modal__header">
          <div class="modal__title">{{ title }}</div>
          <button @click="close" class="modal__close" />
        </div>
        <div class="modal__body">
          <form class="form">
            <my-input :placeholder="'Введите имя...'" v-model="name" />
            <my-input :placeholder="'Введите телефон...'" v-model="phone" />
            <select class="form__input" v-model="parentId">
              <option :value="null">None</option>
              <option
                v-for="option in options"
                :key="option.id"
                :value="option.id"
              >
                {{ option.name + ` (id:${option.id})` }}
              </option>
            </select>
          </form>
        </div>
        <div class="modal__footer">
          <my-button @click.native="addUser">
            <template v-slot:value>Сохранить</template>
          </my-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MyButton from "@/components/MyButton.vue";
import MyInput from "./MyInput.vue";

export default {
  name: "Modal",
  components: {
    MyButton,
    MyInput,
  },
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    users: {
      type: Object,
      default: () => [],
    },
  },

  data() {
    return {
      name: "",
      phone: "",
      parentId: null,
    };
  },

  computed: {
    options() {
      return Object.keys(this.users).map((id) => this.users[id]);
    },
  },

  methods: {
    close() {
      this.$emit("close");
    },

    addUser() {
      this.close();
      this.$emit("add-user", this.name, this.phone, this.parentId);
    },
  },
};
</script>

<style>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: relative;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 8px 1px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}
.modal__body {
  margin-top: 10px;
}
.modal__footer {
  margin-top: 10px;
}

.modal__title {
  font-size: 26px;
}

.form__input {
  margin-top: 5px;
  display: block;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 8px;
  outline: none;
}

.form__input:focus {
  border-color: #87cefa;
}

.modal__close {
  position: relative;
  cursor: pointer;
  position: absolute;
  background: none;
  border: none;
  width: 15px;
  height: 15px;
  top: 5px;
  right: 5px;
}

.modal__close::before,
.modal__close::after {
  position: absolute;
  top: 50%;
  right: 0;
  content: "";
  width: 12px;
  height: 1px;
  border-radius: 8px;
  background: #000;
}

.modal__close::before {
  transform: rotate(-45deg);
}

.modal__close::after {
  transform: rotate(45deg);
}

.modal-fade-enter,
.modal-fade-leave-active {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
</style>