<template>
  <button class="btn">
    <slot></slot> <!-- text mezdu <my-button> budet "sohranjatsja" zdes-->
  </button>
</template>

<script>
export default {
    name: 'my-button'
};
</script>

<style scoped>
.btn {
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: blueviolet;
  border: 1px solid green;
}
</style>