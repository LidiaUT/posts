<template>
    <select v-model="valueSelect" @change="changeOption"> <!-- v video owibka, v-model ne nado, a srazu value="modelValue" -->
        <option disabled value="">Choose something</option>
        <option v-for="option in options" v-bind:key="option.value" v-bind:value="option.value">
            {{option.name}}
        </option>
    </select>
</template>

<script>
export default {
    name: 'my-select',
    data(){
        return {
            valueSelect:''
        }
    }, 
    props: {
        modelValue: {
            type: String,
        },
        options: {
            type: Array,
            default: () => [] // pustoj vipadajuwij massiv dlja vibora option
        }
    },
    methods: {
        changeOption(event) {
            this.$emit('update:modelValue', event.target.value) //This will be emitted up
        }
    }
}
</script>