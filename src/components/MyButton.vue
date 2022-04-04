<template>
  <button class="button">
    <slot name="value"/>
  </button>
</template>

<script>
export default {
    name: 'MyButton',
}
</script>

<style scoped>
.button {
  transition: 0.5s;
  cursor: pointer;
  border: none;
  font-size: 14px;
  padding: 5px 10px;
  border-radius: 8px;
  background: #87CEFA;
  color: #fff;
}

.button:hover {
  background: #C0C0C0;
  color: #fff;
}

</style>