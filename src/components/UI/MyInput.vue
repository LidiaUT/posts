<template>
    <input v-bind:value="modelValue" @input="updateInput" class="input" type="text">
</template>

<script>
export default {
    name: 'my-input',
    props: {
        modelValue: [String, Number]
    },
    methods: {
        updateInput(event) {
            this.$emit('update:modelValue', event.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    width: 95%;
    margin: auto;
    border: 2px dashed blue;
    padding: 10px 15px;
    margin-top: 15px;
}
</style>