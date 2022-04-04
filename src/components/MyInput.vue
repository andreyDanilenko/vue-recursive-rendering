<template>
  <input
    class="input"
    :placeholder="placeholder"
    :value="value"
    @input="$emit('input', $event.target.value)"
    type="text"
  />
</template>

<script>
export default {
  name: "Input",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
};
</script>

<style>
.input {
  margin-top: 5px;
  display: block;
  padding: 10px;
  border: 1px solid lightgray;
  border-radius: 8px;
  outline: none;
}

.input:focus {
  border-color: #87cefa;
}
</style>