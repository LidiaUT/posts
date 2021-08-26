
<template>
    <div class="dialog" v-if="show === true" @click.stop="hideDialog"> <!--po umol4aniju dialogovoe okno=forma vnosa posta vidno, razmire v min-width/min-height; esli nazali v ljuboe mesto, okno is4ezlo -->
        <div @click.stop class="dialog_content"> <!-- pri wel4ke v formu, ona ne propadajet-->
            <slot></slot> <!-- a vnutri content -->
        </div>
    </div>
</template>

<script>
export default {
    name: 'my-dialog',
    props: { // vidim mi modalnoe (dialogovoe) okno ili net
        show: {
            type: Boolean,
            default: false // po umol4aniju ne vidim
        }
    },
    methods: {
        hideDialog() {
            this.$emit('update:show', false)
        }
    }
}
</script>

<style scoped>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5); /* zadnij fon za dialogovim oknom*/
    position: fixed; /* 4tobi okno bilo v seredine stranici*/ 
    display: flex; /* 4tobi content mozno bilo otcentrizovat blok*/
} 
.dialog_content {
    margin: auto; /* blok budet po seredine */
    background-color: wheat;
    border-radius: 12px;
    min-height: 50px;
    min-width: 300px;
    padding: 20px;

}

</style>